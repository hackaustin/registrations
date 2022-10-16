import { error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST({ request }) {
  const { parent, participant, address, date, agreement } = await request.json();
  const record = await prisma.waiver.create({
    data: {
      participantName: participant.name,
      participantEmail: participant.email,
      participantPhone: participant.phone,
      participantDob: participant.dob,
      participantInitials: participant.initials,
      participantSignature: participant.signature,
      parentName: parent.name,
      parentEmail: parent.email,
      parentPhone: parent.phone,
      parentSignature: parent.signature,
      agreement: agreement
    }
  })
  return record
}