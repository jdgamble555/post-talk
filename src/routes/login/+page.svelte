<script lang="ts">
	import LoginGuard from '$lib/shared/guards/login-guard.svelte';
	import Login from '$lib/features/auth/login.svelte';
</script>

<LoginGuard>
	<Login />
</LoginGuard>
