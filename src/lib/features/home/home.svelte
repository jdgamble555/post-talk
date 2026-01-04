<script>
	import PostFeed from '$lib/features/post/post-feed.svelte';
	import PostForm from '$lib/features/post/post-form.svelte';
	import AuthGuard from '../../shared/guards/auth-guard.svelte';
</script>

<AuthGuard>
	<PostForm />
	<PostFeed />
</AuthGuard>
