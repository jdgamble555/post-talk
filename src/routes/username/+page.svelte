<script lang="ts">
	import NewUsername from '$lib/features/auth/new-username.svelte';
	import UsernameGuard from '$lib/shared/guards/username-guard.svelte';
</script>

<UsernameGuard>
	<NewUsername />
</UsernameGuard>
