<script lang="ts">
	import { goto } from '$app/navigation';
	import { useUser } from '$lib/shared/firebase/use-user.svelte';
	import Loading from '$lib/shared/loading.svelte';
	import { page } from '$app/state';
	import { SvelteURLSearchParams } from 'svelte/reactivity';

	const { children } = $props();

	const user = useUser();

	const currentUser = $derived(user.current);

	const next = new SvelteURLSearchParams({
		next: page.url.pathname || '/home'
	});

	const loginURL = $derived('/login?' + next.toString());
	const usernameURL = $derived('/username?' + next.toString());

	$effect(() => {
		if (currentUser.loading) return;

		if (!currentUser.data || currentUser.error) {
			// eslint-disable-next-line svelte/no-navigation-without-resolve
			goto(loginURL);
		}

		if (!currentUser.data?.username) {
			// eslint-disable-next-line svelte/no-navigation-without-resolve
			goto(usernameURL);
		}
	});
</script>

{#if currentUser.loading}
	<Loading />
{:else if currentUser.data}
	{@render children()}
{:else}
	<!-- nothing / redirecting... -->
{/if}
