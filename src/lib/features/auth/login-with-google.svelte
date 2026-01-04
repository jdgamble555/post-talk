<script lang="ts">
	import { useAuth } from '$lib/shared/firebase/use-auth';
	import { toast } from 'svelte-sonner';

	const { loginWithGoogle } = useAuth();

	const onclick = async () => {
		const { error: loginError } = await loginWithGoogle();

		if (loginError) {
			toast.error('Failed to login with Google');
			return;
		}
	};
</script>

<button class="bg-red-600 p-2 font-semibold text-white" {onclick}>
	Signin with Google
</button>
