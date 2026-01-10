<script lang="ts">
	import { goto } from '$app/navigation';
	import { useUser } from '$lib/shared/firebase/use-user.svelte';
	import Loading from '$lib/shared/loading.svelte';
	import { page } from '$app/state';
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';

	const { children } = $props();

	const user = useUser();

	const currentUser = $derived(user.current);

	const next = $derived.by(() => {
		const _next = page.url.pathname || '/home';
		const params = new SvelteURLSearchParams();
		params.set('next', _next);
		return params.toString();
	});

	const loginURL = $derived(`/login?${next}` as Pathname);
	const usernameURL = $derived(`/username?${next}` as Pathname);

	$effect(() => {
		if (currentUser.loading) return;

		if (!currentUser.data || currentUser.error) {
			goto(resolve(loginURL));
		}

		if (!currentUser.data?.username) {
			goto(resolve(usernameURL));
		}
	});
</script>

{#if currentUser.data}
	{@render children()}
{:else}
	<Loading />
{/if}
