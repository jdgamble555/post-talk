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

	const profileShema = v.object({
		bio: v.nullable(
			v.pipe(
				v.string(),
				v.maxLength(160, 'Bio must be at most 160 characters long.')
			)
		),
		displayName: v.pipe(
			v.string(),
			v.minLength(2, 'Display name must be at least 2 characters long.'),
			v.maxLength(50, 'Display name must be at most 50 characters long.')
		)
	});

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
	let issues = $state<v.FlatErrors<typeof profileShema> | null>(null);
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
			issues = v.flatten<typeof profileShema>(result.issues);
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
								aria-invalid={!!issues?.nested?.displayName?.[0]}
							/>

							{#if issues?.nested?.displayName}
								<Field.Error>{issues.nested.displayName[0]}</Field.Error>
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
								aria-invalid={!!issues?.nested?.bio?.[0]}
							/>
							{#if issues?.nested?.bio}
								<Field.Error>{issues.nested.bio[0]}</Field.Error>
							{:else}
								<Field.Description>
									This will appear on your profile.
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
			{/if}
		</div>
	</div>
</form>
