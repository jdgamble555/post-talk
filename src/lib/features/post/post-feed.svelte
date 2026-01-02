<script lang="ts">
	import { usePosts } from '$lib/shared/use-posts.svelte';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import PostActionMenu from './post-action-menu.svelte';

	const posts = usePosts();
	const postData = $derived(posts.current);
</script>

{#if postData.loading}
	<LoaderCircle class="mx-auto mt-5 size-8 animate-spin" />
{:else if postData.error}
	<p class="mt-5 text-center text-red-500">Error: {postData.error}</p>
{:else if postData.data}
	{#each postData.data as post (post.id)}
		<div class="border-b p-5 dark:border-t-0 dark:border-b">
			<p>{post.content}</p>
			<div class="flex items-end justify-end">
				<PostActionMenu id={post.id} createdBy={post.createdBy} />
			</div>
		</div>
	{:else}
		<p class="mt-5 text-center text-gray-500">There are no posts yet.</p>
	{/each}
{/if}
