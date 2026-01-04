<script lang="ts">
	import { goto } from '$app/navigation';
	import { useAuth } from '$lib/shared/firebase/use-auth';
	import { resolve } from '$app/paths';

	const { username }: { username: string } = $props();

	const { logout } = useAuth();

	const onclick = async () => {
		await logout();
		await goto(resolve('/'));
	};
</script>

<button type="button" class="cursor-pointer" {onclick}>
	Log out @{username}
</button>
