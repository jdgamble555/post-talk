<script lang="ts">
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import { useUser } from '$lib/shared/firebase/use-user.svelte';
	import Loading from '$lib/shared/loading.svelte';
	import { page } from '$app/state';
	import { useAuth } from '$lib/shared/firebase/use-auth';
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import type { Pathname } from '$app/types';

	const { children } = $props();

	const user = useUser();
	const { logout } = useAuth();

	const currentUser = $derived(user.current);

	const next = $derived.by(() => {
		let _next = page.url.searchParams.get('next') || '/home';

		// Prevent redirect loop
		if (_next.startsWith('/login')) {
			_next = '/home';
		}
		return _next as Pathname;
	});

	const loginURL = $derived.by(() => {
		const params = new SvelteURLSearchParams();
		params.set('next', next);
		return `/login?${params.toString()}` as Pathname;
	});

	const runLogout = async () => {
		await logout();
		await goto(resolve(loginURL));
	};

	$effect(() => {
		if (currentUser.loading) {
			return;
		}

		if (currentUser.data) {
			goto(resolve(next));
			return;
		}

		if (currentUser.error) {
			runLogout();
		}
	});
</script>

{#if !currentUser.data}
	{@render children()}
{:else}
	<Loading />
{/if}
