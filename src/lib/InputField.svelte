<script lang="ts">
    export let invalid: boolean = false;
    export let label: string;
    export let value: any = "";
    export let required = false;
    export let name: string;
    export let type: string = "text";
    export let hideInvalidLabel: boolean = false;

</script>

<label for={name} style="margin-bottom: 0.025">{@html label}:</label>
{#if type == "text"}
    <input class={invalid === true ? "invalid" : ""} bind:value={value} name={name} type="text" {required}>
{:else if type == "email"}
    <input class={invalid === true ? "invalid" : ""} bind:value={value} name={name} type="email" {required}>
{:else if type == "tel"}
    <input class={invalid === true ? "invalid" : ""} bind:value={value} name={name} type="tel" {required}>
{:else if type == "date"}
    <input class={invalid === true ? "invalid" : ""} bind:value={value} name={name} type="date" {required}>
{:else if type == "select"}
    <select name={name} class={invalid === true ? "invalid" : ""} bind:value={value} {required}>
       <slot></slot>
    </select>
{:else if type == "checkbox"}
    <input class={invalid === true ? "invalid" : ""} checked={false} name={name} type="checkbox" {required}>
{:else if type == "textarea"}
    <textarea name={name} class={invalid === true  ? "invalid" : ""} bind:value={value} required={required}></textarea>
{/if}

{#if invalid && hideInvalidLabel == false}
    <label for={name} style="margin-top: 0.025; color: red">This value is invalid or missing</label>
{/if}

<style>
    input:not([type=checkbox]) {
		width: 100%;
	}
	
	.invalid {
		border-color: #ff6961;
	}
</style>