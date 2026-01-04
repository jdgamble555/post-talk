<script lang="ts">
	import Account from '$lib/features/settings/profile-settings.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<Account profile={data.profile} />
