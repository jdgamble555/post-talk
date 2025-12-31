<script lang="ts">
	import Layout from '$lib/features/app/layout.svelte';

	const { children } = $props();
</script>

<Layout>
	{@render children()}
</Layout>
