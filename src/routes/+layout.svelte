<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { ModeWatcher } from 'mode-watcher';
	import { useUser } from '$lib/shared/use-user.svelte';

	let { children } = $props();

	useUser();
</script>

<Toaster />
<ModeWatcher />

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
