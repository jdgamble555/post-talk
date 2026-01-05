<script lang="ts">
	import BackBar from '$lib/shared/back-bar.svelte';
	import * as Field from '$lib/components/ui/field/index.js';
	import { Button } from '$lib/components/ui/button';
	import { LoaderCircle } from '@lucide/svelte';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { useProfile } from '$lib/shared/firebase/use-profile';
	import { emailSchema } from './email-schema';
	import * as v from 'valibot';
	import { useUser } from '$lib/shared/firebase/use-user.svelte';

	const { updateEmail } = useProfile();

	const user = useUser();

	// TODO
	// remove email from users doc
	// handle login with magic link
	// handle relogin for change email
	// update photo, drag and drop and click
	// update connections
	// look into linking accounts with different emails

	let email = $derived(user.current.data?.email || '');
	let isSaving = $state<boolean>(false);
	let issues = $state<v.FlatErrors<typeof emailSchema>['nested'] | null>(null);
	let valid = $state<boolean>(false);

	const oninput = () => {
		const result = v.safeParse(emailSchema, { email });
		if (!result.success) {
			issues = v.flatten<typeof emailSchema>(result.issues).nested;
			valid = false;
			return;
		}
		issues = null;
		valid = true;
	};

	const onclick = async () => {
		isSaving = true;
		const { error } = await updateEmail(email);
		isSaving = false;

		if (error) {
			console.error(error);
			toast.error('Failed to update email.');
			return;
		}
		toast.success('Email updated successfully!');
	};
</script>

<div class="flex flex-col gap-5">
	<BackBar title="Change Email" href="/settings" />
	<div class="px-5">
		<Field.Set>
			<Field.Group>
				<Field.Field>
					<Field.Label for="email">Email</Field.Label>
					<Input
						id="email"
						autocomplete="off"
						placeholder="m@example.com"
						{oninput}
						bind:value={email}
						aria-invalid={!!issues?.email?.[0]}
					/>

					{#if issues?.email}
						<Field.Error>{issues.email[0]}</Field.Error>
					{:else}
						<Field.Description>
							This will be your new email address.
						</Field.Description>
					{/if}
				</Field.Field>
				<Button {onclick} disabled={!valid}>
					{#if isSaving}
						<LoaderCircle class="size-4 animate-spin" />
					{:else}
						Save
					{/if}
				</Button>
			</Field.Group>
		</Field.Set>
	</div>
</div>
