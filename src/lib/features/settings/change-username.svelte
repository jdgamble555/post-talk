<script lang="ts">
	import BackBar from '$lib/shared/back-bar.svelte';

	import Username from '../auth/username.svelte';
</script>

<div class="flex flex-col gap-5">
	<BackBar title="Change Username" href="/settings" />
	<div class="flex flex-col gap-3 px-5">
		<Username />
	</div>
</div>
