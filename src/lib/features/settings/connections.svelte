<script lang="ts">
	import BackBar from '$lib/shared/back-bar.svelte';
	import { useUser } from '$lib/shared/firebase/use-user.svelte';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { useAuth } from '$lib/shared/firebase/use-auth';
	import { toast } from 'svelte-sonner';

	const user = useUser();

	const { addProvider, removeProvider } = useAuth();

	const connectedProviders = $derived(user.current.data?.providers || []);

	const onCheckedChange = async (provider: string, checked: boolean) => {
		if (checked) {
			const { error: addError } = await addProvider(provider);
			if (addError) {
				toast.error(addError.message);
			}
			return;
		}
		const { error: removeError } = await removeProvider(provider);
		if (removeError) {
			toast.error(removeError.message);
		}
	};

	/*
	// Add more providers as needed
	export const firebaseAuthProviders = [
		'password', 
		'phone',
		'anonymous',
		'custom',
		'google.com',
		'facebook.com',
		'twitter.com',
		'github.com',
		'microsoft.com',
		'apple.com',
		'yahoo.com'
	] as const;
	*/

	const providers = ['google.com'];
</script>

<div class="flex flex-col gap-5">
	<BackBar title="Connected Accounts" href="/settings" />
</div>

<div class="flex flex-col justify-between gap-4 p-5">
	{#each providers as provider (provider)}
		<div class="flex items-center justify-between space-x-2">
			<Label for={provider}>
				Login with {provider
					.replace(/\.com$/, '')
					.replace(/^./, (c) => c.toUpperCase())}
			</Label>
			<Switch
				onCheckedChange={(checked) => onCheckedChange(provider, checked)}
				checked={connectedProviders.includes(provider)}
				id={provider}
			/>
		</div>
	{/each}
</div>
