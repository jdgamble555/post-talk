<script lang="ts">
	import { useDeletePost } from '$lib/shared/firebase/use-posts.svelte';
	import { toast } from 'svelte-sonner';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';

	let { id, open = $bindable() }: { id: string; open: boolean } = $props();

	const { deletePost } = useDeletePost();

	const onclick = async () => {
		const { error: postError } = await deletePost(id);

		if (postError) {
			toast.error(postError.message);
			return;
		}

		toast.success('Post deleted successfully!');
	};
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete your post.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action class="bg-red-700 text-white hover:bg-red-600" {onclick}>
				Delete
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
