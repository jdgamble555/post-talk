<script lang="ts">
	import { goto } from '$app/navigation';
	import { useUser } from '$lib/shared/firebase/use-user.svelte';
	import Loading from '$lib/shared/loading.svelte';
	import { page } from '$app/state';
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';

	const { children } = $props();

	const user = useUser();
	const currentUser = $derived(user.current);

	const next = $derived.by(() => {
		let _next = page.url.searchParams.get('next') || '/home';

		// Prevent redirect loop
		if (_next.startsWith('/username')) {
			_next = '/home';
		}
		return _next as Pathname;
	});

	const loginURL = $derived.by(() => {
		const params = new SvelteURLSearchParams();
		params.set('next', next);
		return `/login?${params.toString()}` as Pathname;
	});

	$effect(() => {
		if (currentUser.loading) {
			return;
		}

		if (!currentUser.data || currentUser.error) {
			goto(resolve(loginURL));
		}

		if (currentUser.data?.username) {
			goto(resolve(next));
		}
	});
</script>

{#if currentUser.data}
	{@render children()}
{:else}
	<Loading />
{/if}
