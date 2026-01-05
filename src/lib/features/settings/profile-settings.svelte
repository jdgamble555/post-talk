<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Field from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import BackBar from '$lib/shared/back-bar.svelte';
	import { useProfile } from '$lib/shared/firebase/use-profile';
	import { LoaderCircle } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import * as v from 'valibot';
	import { profileShema } from './profile-schema';

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
	let issues = $state<v.FlatErrors<typeof profileShema>['nested'] | null>(null);
	let valid = $state<boolean>(false);

	const { updateProfile, getProfile } = useProfile();

	const loadProfile = async () => {
		userDoc.loading = true;
		const { data, error } = await getProfile();
		userDoc.loading = false;
		userDoc.error = error;
		userDoc.data = data;
		if (error) {
			toast.error(error.message);
			console.error(error);
		}
	};

	$effect(() => {
		loadProfile();
	});

	const oninput = () => {
		const result = v.safeParse(profileShema, { displayName, bio });
		if (!result.success) {
			issues = v.flatten<typeof profileShema>(result.issues).nested;
			valid = false;
			return;
		}
		issues = null;
		valid = true;
	};

	const onclick = async () => {
		isSaving = true;
		const { error } = await updateProfile(displayName, bio);
		isSaving = false;

		if (error) {
			console.error(error);
			toast.error('Failed to update profile.');
			return;
		}
		toast.success('Profile updated successfully!');
	};
</script>

<form {oninput}>
	<div class="flex flex-col gap-5">
		<BackBar title="Profile Settings" href="/settings" />
		<div class="px-5">
			{#if userDoc.loading}
				<div class="flex items-center justify-center">
					<LoaderCircle class="size-8 animate-spin" />
				</div>
			{:else}
				<Field.Set>
					<Field.Legend>Profile</Field.Legend>
					<Field.Description>
						This is the information associated with your profile.
					</Field.Description>
					<Field.Group>
						<Field.Field>
							<Field.Label for="name">Display Name</Field.Label>
							<Input
								id="name"
								autocomplete="off"
								placeholder="Evil Rabbit"
								bind:value={displayName}
								aria-invalid={!!issues?.displayName?.[0]}
							/>

							{#if issues?.displayName}
								<Field.Error>{issues.displayName[0]}</Field.Error>
							{:else}
								<Field.Description>
									This will appear on your profile.
								</Field.Description>
							{/if}
						</Field.Field>
						<Field.Field>
							<Field.Label for="bio">Bio</Field.Label>
							<Textarea
								id="bio"
								autocomplete="off"
								placeholder="Tell us about yourself"
								bind:value={bio}
								aria-invalid={!!issues?.bio?.[0]}
							/>
							{#if issues?.bio}
								<Field.Error>{issues.bio[0]}</Field.Error>
							{:else}
								<Field.Description>
									This will appear on your profile.
								</Field.Description>
							{/if}
						</Field.Field>
						<Button {onclick} disabled={!valid || isSaving}>
							{#if isSaving}
								<LoaderCircle class="size-4 animate-spin" />
							{:else}
								Save
							{/if}
						</Button>
					</Field.Group>
				</Field.Set>
			{/if}
		</div>
	</div>
</form>
