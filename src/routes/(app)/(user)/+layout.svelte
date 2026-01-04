<script lang="ts">
	import AuthGuard from '$lib/shared/guards/auth-guard.svelte';
	import Layout from '$lib/features/app/layout.svelte';

	const { children } = $props();
</script>

<AuthGuard>
	<Layout>
		{@render children()}
	</Layout>
</AuthGuard>
