<script async lang="ts">

	import { enhance } from '$app/forms';
	import InputField from '$lib/InputField.svelte';

	export let form: any

	if(form) console.log(form)

	function invalid(missingVal: string, el: string, emailTaken?: boolean) {

		if(emailTaken && el == "email") {
			const element = document.querySelector(`[name=${el}]`)

			element?.addEventListener("input", (e) => {
				form.emailTaken = false;
				
				

				e.target?.removeEventListener("input", () => {})

			})
			return true
		}

		if(missingVal == el) {
			const element = document.querySelector(`[name=${el}]`)

			element?.addEventListener("input", (e) => {
				form.missing = "";
				
				

				e.target?.removeEventListener("input", () => {})

			})
			return true
		}	

		return false;
	}
	
</script>

<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore missing-declaration -->
<svelte:head>
  <!-- HTML Meta Tags -->
  <title>Hack Austin! - Registration Form</title>
  <meta name="description" content="Hack Austin is a nonprofit hackathon for Austin high-schoolers to learn to code and build projects they're proud of. The venue is TBD, and will be held on October 14th from 10AM-8PM. Register today!">

  <!-- Google / Search Engine Tags -->
  <meta itemprop="name" content="Hack Austin! - Registration Form">
  <meta itemprop="description" content="Hack Austin is a nonprofit hackathon for Austin high-schoolers to learn to code and build projects they're proud of. The venue is TBD, and will be held on October 14th from 10AM-8PM. Register today!">
  <meta itemprop="image" content="/meta.png">

  <!-- Facebook Meta Tags -->
  <meta property="og:url" content="https://hackaustin.net">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Hack Austin! - Registration Form">
  <meta property="og:description" content="Hack Austin is a nonprofit hackathon for Austin high-schoolers to learn to code and build projects they're proud of. The venue is TBD, and will be held on October 14th from 10AM-8PM. Register today!">
  <meta property="og:image" content="/meta.png">

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Hack Austin! - Registration Form">
  <meta name="twitter:description" content="Hack Austin is a nonprofit hackathon for Austin high-schoolers to learn to code and build projects they're proud of. The venue is TBD, and will be held on October 14th from 10AM-8PM. Register today!">
  <meta name="twitter:image" content="/meta.png">
</svelte:head>


<div>
	<h1>
		Hack Austin Registration!
	</h1>
</div>


<form method="POST" id="form" use:enhance>
			<InputField name="name" invalid={invalid(form?.missing, "name")} type="text" label="Name"></InputField>
			
			<InputField name="pronouns" invalid={invalid(form?.missing, "pronouns")} type="text" label="Your Pronouns"></InputField>

			
			<InputField name="email" hideInvalidLabel={form?.emailTaken ? true : false} invalid={invalid(form?.missing, "email", form?.emailTaken)} label="Contact Email <b>(very important)</b>" type="email" required={true}></InputField>
			{#if form?.emailTaken}
				<label for="email" style="margin-top: 0.025; color: red">Somone else has already registered with this email</label>
			{/if}

			<InputField invalid={form?.missing == "dob" ? true : false} label="Date of birth (upper middle &amp; high-school only)" name="dob" type="date" required={true}></InputField>


			<InputField invalid={invalid(form?.missing, "tShirtSize")} name="tShirtSize" label="T-Shirt Size" required={true} type="select">
				<option value="AXS">AXS</option>
				<option value="AS">AS</option>
				<option value="AM">AM</option>
				<option value="AL">AL</option>
				<option value="AXL">AXL</option>
			</InputField>
		
			
			<InputField invalid={invalid(form?.missing, "vaccineStatus")} name="vaccineStatus" type="checkbox" label="I am vaccinated! (you will be required to present proof)" required={true}></InputField>
			
			<InputField invalid={invalid(form?.missing, "technicalSkill")} label="How technical are you? (Beginners are totally welcome! :D)" type="select" name="technicalSkill" required={true}>
					<option value="BEGINNER">Beginner - No coding experience or just started learning</option>
					<option value="INTERMEDIATE">Intermediate - I've taken some CS class or have worked on small projects</option>
					<option value="ADVANCED">Advanced - I can work on projects with little guidance</option>
			</InputField>
			
			<InputField invalid={invalid(form?.missing, "workshop")} name="workshop" label="Would you like to host a workshop?" type="checkbox"></InputField>
	
			<InputField invalid={invalid(form?.missing, "dietaryRestrictions")}  name="dietaryRestrictions" label="Dietary Restrictions" type="textarea"></InputField>
	
			
			<input type="submit" value="Register!">	
			
		</form>

<style>
	@import url("https://cdn.simplecss.org/simple.min.css");
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

    :root {
        --primary-green: #37F17A;
        --darker-green: #20964B;
        --darkest-green: #154125;
    }


    * {
        font-family: 'Space Grotesk', sans-serif;
        letter-spacing: -0.035em;
    }

    ::global(body) {
        margin: 0;
        scroll-behavior: smooth;
    }

    .primary-green {
        color: var(--primary-green);
    }

    .darker-green {
        color: var(--darker-green);
    }

    .darkest-green {
        color: var(--darkest-green);
    }

    .bg-primary-green {
        background-color: var(--primary-green);
    }

    .bg-darker-green {
        background-color: var(--darker-green);
    }

    .bg-darkest-green {
        background-color: var(--darkest-green);
    }

    .mono {
        font-family: 'Space Mono', 'Space Grotesk', sans-serif;
    }

    .text-center {
        text-align: center;
    }
	:root {
		--accent: #37F17A !important;
	}
	
	input[type=submit] {
		color: black;
		font-weight: bold;
	}
	
	@media (prefers-color-scheme: dark) {
		div > h1 {
			color: #212121 !important
		}
	}
	
	div {
		background-color: var(--accent);
		width: 100%;
		padding: 0.25rem;
		margin: 1rem 0;
		border-radius: 12px;
	}
	
	div > h1 {
		text-align: center;
	}
	
	input:not([type=checkbox]) {
		width: 100%;
	}
	
	input.error {
		border-color: #ff6961;
	}
</style>
