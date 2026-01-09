<script lang="ts">
	import { useValibotSchema } from '$lib/shared/use-schema.svelte';
	import BackBar from '$lib/shared/back-bar.svelte';
	import { Button } from '$lib/components/ui/button';
	import { LoaderCircle } from '@lucide/svelte';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { useProfile } from '$lib/shared/firebase/use-profile';
	import { emailSchema } from './email-schema';
	import { useUser } from '$lib/shared/firebase/use-user.svelte';
	import {
		Field,
		FieldSet,
		FieldLabel,
		FieldGroup,
		FieldDescription,
		FieldError
	} from '$lib/components/ui/field/index.js';

	const { updateEmail } = useProfile();

	const user = useUser();

	const { issues: _issues, validate } = useValibotSchema(emailSchema);

	const issues = $derived(_issues.current);

	// TODO
	// update photo, drag and drop and click
	// update connections
	// look into linking accounts with different emails

	let email = $derived(user.current.data?.email || '');
	let isSaving = $state<boolean>(false);

	const onclick = async () => {
		isSaving = true;
		const { error } = await updateEmail(email);
		isSaving = false;

		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success('Email updated successfully!');
	};
</script>

<div class="flex flex-col gap-5">
	<BackBar title="Change Email" href="/settings" />
	<div class="px-5">
		<FieldSet>
			<FieldGroup>
				<Field>
					<FieldLabel for="email">Email</FieldLabel>
					<Input
						id="email"
						autocomplete="off"
						placeholder="m@example.com"
						oninput={() => validate({ email })}
						bind:value={email}
						aria-invalid={!!issues?.email}
					/>

					{#each issues?.email as issue (issue)}
						<FieldError>{issue}</FieldError>
					{:else}
						<FieldDescription>
							This will be your new email address.
						</FieldDescription>
					{/each}
				</Field>
				<Button {onclick} disabled={!!issues || isSaving}>
					{#if isSaving}
						<LoaderCircle class="size-4 animate-spin" />
					{:else}
						Save
					{/if}
				</Button>
			</FieldGroup>
		</FieldSet>
	</div>
</div>
