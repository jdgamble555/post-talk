<script lang="ts">
	import { goto } from '$app/navigation';
	import { useAuth } from '$lib/shared/use-auth';
	import { toast } from 'svelte-sonner';
	import { resolve } from '$app/paths';

	const { loginWithGoogle } = useAuth();

	const onclick = async () => {
		try {
			await loginWithGoogle();
			await goto(resolve('/home'));
		} catch {
			toast.error('Failed to login with Google');
		}
	};
</script>

<button class="bg-red-600 p-2 font-semibold text-white" {onclick}> Signin with Google </button>
