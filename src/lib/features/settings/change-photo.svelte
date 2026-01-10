<script lang="ts">
	import BackBar from '$lib/shared/back-bar.svelte';
	import { useUser } from '$lib/shared/firebase/use-user.svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Button } from '$lib/components/ui/button';
	import Progress from '$lib/components/ui/progress/progress.svelte';
	import { toast } from 'svelte-sonner';
	import { useFile } from '$lib/shared/use-file.svelte';
	import { useProfilePhoto } from '$lib/shared/firebase/use-profile-photo';
	import { Camera, Trash } from '@lucide/svelte';

	const user = useUser();
	const currentUser = $derived(user.current.data);

	const fallback = $derived(
		currentUser?.username
			? currentUser.username.charAt(0).toUpperCase()
			: currentUser?.email?.charAt(0).toUpperCase() || 'P'
	);

	const { uploadProfilePhoto, status, removeProfilePhoto } = useProfilePhoto();
	const { fileInput, file: _file, files, resetFiles } = useFile();
	const file = $derived(_file.current);
	const progress = $derived(status.current.progress);

	const onchange = async () => {
		if (file && currentUser) {
			const { error: uploadError } = await uploadProfilePhoto(file);
			if (uploadError) {
				toast.error(uploadError.message);
				return;
			}
			resetFiles();
			toast.success('Photo uploaded successfully!');
		}
	};

	const onclick = async () => {
		const { error: removeError } = await removeProfilePhoto();
		if (removeError) {
			toast.error(removeError.message);
			return;
		}
		toast.success('Photo removed successfully!');
	};
</script>

<div class="flex flex-col gap-5">
	<BackBar title="Change Photo" href="/settings" />
</div>

<div class="flex items-center justify-center p-5">
	<Avatar.Root class="size-60">
		<Avatar.Image
			src={currentUser?.photoURL}
			alt={currentUser?.username
				? `${currentUser.username} profile`
				: 'Profile'}
		/>
		<Avatar.Fallback class="[html:not(.dark)_&]:bg-gray-200">
			{fallback}
		</Avatar.Fallback>
	</Avatar.Root>
</div>
<input
	type="file"
	accept="image/*"
	{onchange}
	class="hidden"
	bind:this={fileInput.current}
	bind:files={files.current}
/>

<div class="flex flex-col items-center justify-center gap-5 px-5">
	<div class="flex items-center justify-center gap-4 px-5">
		<Button variant="outline" onclick={() => fileInput.current?.click()}>
			<Camera />{currentUser?.photoURL ? 'Change Photo' : 'Add Photo'}
		</Button>
		{#if currentUser?.photoURL}
			<Button variant="outline" {onclick}>
				<Trash />Remove Photo
			</Button>
		{/if}
	</div>
	{#if progress && progress < 100}
		<Progress value={progress} class="w-32" />
	{/if}
</div>
