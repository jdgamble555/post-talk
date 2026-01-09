<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { ModeWatcher } from 'mode-watcher';
	import { useUser } from '$lib/shared/firebase/use-user.svelte';
	import { useMagicSignIn } from '$lib/shared/firebase/use-magic-sign-in.svelte';

	let { children } = $props();

	useUser();
	useMagicSignIn();
</script>

<Toaster />
<ModeWatcher />

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

{@render children()}
