<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Field from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import BackBar from '$lib/shared/back-bar.svelte';
	import { useUser } from '$lib/shared/firebase/use-user.svelte';
	import { useProfile } from '$lib/shared/use-profile';
	import { toast } from 'svelte-sonner';

	const { profile }: { profile?: UserDoc } = $props();

	const user = useUser();

	const userDoc = $derived(profile);

	const { updateUserProfile } = useProfile();

	let displayName = $derived(user.current.data?.displayName || '');
	let bio = $derived(userDoc?.bio || '');

	const onclick = async () => {
		const { error } = await updateUserProfile(displayName, bio);

		if (error) {
			console.error(error);
			toast.error('Failed to update profile.');
			return;
		}

		toast.success('Profile updated successfully!');
	};
</script>

<div class="flex flex-col gap-5">
	<BackBar title="Profile Settings" href="/settings" />
	<div class="px-5">
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
					/>
					<Field.Description>
						This will appear on your profile.
					</Field.Description>
				</Field.Field>
				<Field.Field>
					<Field.Label for="bio">Bio</Field.Label>
					<Textarea
						id="bio"
						autocomplete="off"
						placeholder="Tell us about yourself"
						bind:value={bio}
					/>
					<Field.Description>
						This will appear on your profile.
					</Field.Description>
				</Field.Field>
				<Button {onclick}>Save</Button>
			</Field.Group>
		</Field.Set>
	</div>
</div>
