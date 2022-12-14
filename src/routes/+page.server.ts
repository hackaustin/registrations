import { Prisma, PrismaClient, type Participant } from '@prisma/client'
import { error, invalid, redirect } from '@sveltejs/kit';
import postmark from "postmark"
import { env } from '$env/dynamic/private';
const prisma = new PrismaClient()
const client = new postmark.ServerClient(env["POSTMARK_TOKEN"] ?? "");


export const actions = {
    default: async ({ request }: {request: Request}) => {
        const formData = await request.formData()


        const obj: any = {
            name: formData.get("name"),
            pronouns: formData.get("pronouns"),
            dob: formData.get("dob"),
            email: formData.get("email"),
            tShirtSize: formData.get("tShirtSize"),
            vaccineStatus: Boolean(formData.get("vaccineStatus")),
            technicalSkill: formData.get("technicalSkill"),
            workshop: Boolean(formData.get("workshop")),
            dietaryRestrictions: formData.get("dietaryRestrictions")
        }

        let missingObj;
        Object.keys(obj).forEach((el) => {
            if(obj[el] === "") {
                obj[el] = null
            }
            if(obj[el] === null && el != "dietaryRestrictions" && el != "pronouns") {

                return missingObj = {...obj, missing: el};

            }
        })

        if(missingObj) return invalid(400, missingObj)

        

        obj.dob = new Date(obj.dob).toISOString()
        
        if(await prisma.participant.findFirst({
            where: {
                email: obj.email
            }
        })) {
            return invalid(400, {...obj, emailTaken: true})
        }
        const db = await prisma.participant.create({
            data: {
                ...obj
            }
        })
        



        const confirmationEmailPromise = new Promise((resolve) => {
            client.sendEmail({
                "From": "reese@hackaustin.net",
                "To": obj.email,
                "Subject": "You're registered for Hack Austin!",
                "TextBody": `
                    Hi ${obj.name}!
    
                    You're set to attend Hack Austin, the first hackathon for Austin high-schoolers since the pandemic!
                    
                    We'll reach back out soon about waivers, proof of vaccination and more, so stay tuned.
    
                    
                    We can't wait to see you at Hack Austin!
                    
                    --reese
    
                    -----   
                    We value your privacy and we'll never track whether you read or open our emails.
                `,
                "MessageStream": "outbound"
            }, resolve);
        })

        const notificationEmailPromise = new Promise((resolve) => {
            client.sendEmail({
                "From": "team@hackaustin.net",
                "To": "reese@hackaustin.net",
                "Subject": `${obj.name} has just registered for Hack Austin!`,
                "TextBody": `
                    ${obj.name} has just registered for HA with details:
    
                    Name: ${obj.name}
                    Pronouns: ${obj.pronouns}
                    Email: ${obj.email}
                    Date of birth: ${obj.dob}
                    T-shirt size: ${obj.tShirtSize}
                    Technical skill: ${obj.technicalSkill}
                    Dietary restrictions: ${obj.dietaryRestrictions}
    
    
                    They${obj.workshop ? "" : " don't"} want to host a workshop
    
    
                `,
                "MessageStream": "outbound"
            }, resolve);
        })

        await Promise.all([confirmationEmailPromise,notificationEmailPromise]).then(() => {
            throw redirect(302, "/success")
        })
    }
};
