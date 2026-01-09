<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import BackBar from '$lib/shared/back-bar.svelte';
	import { useProfile } from '$lib/shared/firebase/use-profile';
	import { LoaderCircle } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import { profileShema } from './profile-schema';
	import {
		Field,
		FieldSet,
		FieldLabel,
		FieldGroup,
		FieldDescription,
		FieldLegend,
		FieldError
	} from '$lib/components/ui/field/index.js';
	import { useValibotSchema } from '$lib/shared/use-schema.svelte';

	let userDoc = $state<{
		data: UserDoc | null;
		loading: boolean;
		error: Error | null;
	}>({
		data: null,
		loading: true,
		error: null
	});

	let displayName = $derived(userDoc.data?.displayName || '');
	let bio = $derived(userDoc.data?.bio || '');
	let isSaving = $state<boolean>(false);


	const { updateProfile, getProfile } = useProfile();

	const { issues: _issues, validate} = useValibotSchema(profileShema);

	const issues = $derived(_issues.current);

	const loadProfile = async () => {
		userDoc.loading = true;
		const { data, error } = await getProfile();
		userDoc.loading = false;
		userDoc.error = error;
		userDoc.data = data;
		if (error) {
			toast.error(error.message);
		}
	};

	$effect(() => {
		loadProfile();
	});

	const onclick = async () => {
		isSaving = true;
		const { error } = await updateProfile(displayName, bio);
		isSaving = false;

		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success('Profile updated successfully!');
	};
</script>

<form oninput={() => validate({ displayName, bio })}>
	<div class="flex flex-col gap-5">
		<BackBar title="Profile Settings" href="/settings" />
		<div class="px-5">
			{#if userDoc.loading}
				<div class="flex items-center justify-center">
					<LoaderCircle class="size-8 animate-spin" />
				</div>
			{:else}
				<FieldSet>
					<FieldLegend>Profile</FieldLegend>
					<FieldDescription>
						This is the information associated with your profile.
					</FieldDescription>
					<FieldGroup>
						<Field>
							<FieldLabel for="name">Display Name</FieldLabel>
							<Input
								id="name"
								autocomplete="off"
								placeholder="Evil Rabbit"
								bind:value={displayName}
								aria-invalid={!!issues?.displayName}
							/>

							{#each issues?.displayName as issue (issue)}
								<FieldError>{issue}</FieldError>
							{:else}
								<FieldDescription>
									This will appear on your profile.
								</FieldDescription>
							{/each}
						</Field>
						<Field>
							<FieldLabel for="bio">Bio</FieldLabel>
							<Textarea
								id="bio"
								autocomplete="off"
								placeholder="Tell us about yourself"
								bind:value={bio}
								aria-invalid={!!issues?.bio}
							/>
							{#each issues?.bio as issue (issue)}
								<FieldError>{issue}</FieldError>
							{:else}
								<FieldDescription>
									This will appear on your profile.
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
			{/if}
		</div>
	</div>
</form>
