<script lang="ts">
	import { goto } from '$app/navigation';
	import { useUser } from '$lib/shared/firebase/use-user.svelte';
	import Loading from '$lib/shared/loading.svelte';
	import { page } from '$app/state';

	const { children } = $props();

	const user = useUser();
	const currentUser = $derived(user.current);

	const next = $derived.by(() => {
		const _next = page.url.searchParams.get('next') || '/home';

		// Prevent redirect loop
		if (_next.startsWith('/username')) {
			return '/home';
		}
		return _next;
	});

	const loginURL = $derived('/login?' + next.toString());

	$effect(() => {
		if (currentUser.loading) {
			return;
		}

		if (!currentUser.data || currentUser.error) {
			// eslint-disable-next-line svelte/no-navigation-without-resolve
			goto(loginURL);
		}

		if (currentUser.data?.username) {
			// eslint-disable-next-line svelte/no-navigation-without-resolve
			goto(next);
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
