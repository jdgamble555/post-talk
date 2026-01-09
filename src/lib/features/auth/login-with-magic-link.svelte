<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import {
		Field,
		FieldLabel,
		FieldError
	} from '$lib/components/ui/field/index.js';
	import { toast } from 'svelte-sonner';
	import { useMagicLink } from '$lib/shared/firebase/use-magic-link';
	import { page } from '$app/state';
	import { LoaderCircle } from '@lucide/svelte';
	import { emailSchema } from './email-schema';
	import { useValibotSchema } from '$lib/shared/use-schema.svelte';

	const { sendMagicLink } = useMagicLink();

	const id = $props.id();

	let isSaving = $state<boolean>(false);
	let email = $derived('');

	const { validate, issues: _issues } = useValibotSchema(emailSchema);
	let issues = $derived(_issues.current);

	const onclick = async () => {
		isSaving = true;
		const { error } = await sendMagicLink(email, page.url.href);
		isSaving = false;

		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success('Magic link sent successfully!');
	};
</script>

<form oninput={() => validate({ email })}>
	<Field>
		<FieldLabel for="email-{id}">Email</FieldLabel>
		<Input
			bind:value={email}
			id="email-{id}"
			type="email"
			required
			aria-invalid={!!issues?.email?.length}
		/>

		{#each issues?.email as issue (issue)}
			<FieldError>{issue}</FieldError>
		{/each}
		<Button {onclick} disabled={!!issues || isSaving}>
			{#if isSaving}
				<LoaderCircle class="size-4 animate-spin" />
			{:else}
				Send Magic Link
			{/if}
		</Button>
	</Field>
</form>
