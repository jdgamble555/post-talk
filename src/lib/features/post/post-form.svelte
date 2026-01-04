<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { useAddPost } from '$lib/shared/firebase/use-posts.svelte';
	import { toast } from 'svelte-sonner';
	import WordCounter from './word-counter.svelte';

	const { addPost } = useAddPost();

	let content = $state<string>('');

	const onclick = async () => {
		if (!content) return;

		const { error: postError } = await addPost(content);

		if (postError) {
			toast.error(postError.message);
			return;
		}

		content = '';
	};
</script>

<div class="border-b p-5">
	<textarea
		bind:value={content}
		name="content"
		class="block w-full resize-none bg-transparent px-4 py-3 text-lg placeholder-gray-400 outline-none focus:border-none focus:ring-0 disabled:pointer-events-none disabled:opacity-50"
		rows="3"
		placeholder="What's up?..."
	></textarea>
	<hr class="m-3" />
	<div class="flex items-center justify-between px-5">
		<Button type="button" disabled={!content} {onclick}>Post</Button>
		<WordCounter {content} />
	</div>
</div>
