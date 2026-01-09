<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import {
		Field,
		FieldLabel,
		FieldDescription,
		FieldError
	} from '$lib/components/ui/field/index.js';
	import { useDebounce } from '$lib/shared/use-debounce';
	import { useUsername } from '$lib/shared/firebase/use-username';
	import { UsernameSchema } from '$lib/features/auth/username-schema';
	import { LoaderCircle } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import { useUser } from '$lib/shared/firebase/use-user.svelte';
	import { useValibotSchema } from '$lib/shared/use-schema.svelte';

	const user = useUser();

	const { afterContinue = () => {} }: { afterContinue?: () => void } = $props();

	const id = $props.id();

	let isLoading = $state<boolean>(false);
	let isAvailable = $state<boolean>(false);

	let username = $derived(user.current.data?.username || '');

	const { usernameAvailable, setUsername } = useUsername();

	const { validate, issues: _issues } = useValibotSchema(UsernameSchema);

	let issues = $derived(_issues.current);

	const debounceUsername = useDebounce(async () => {
		if (issues) return;

		isLoading = true;

		const { error: availableError, available } =
			await usernameAvailable(username);

		isLoading = false;

		if (availableError) {
			issues = { username: [availableError.message] };
			return;
		}

		isAvailable = available;

		if (!available) {
			issues = { username: ['Username is already taken.'] };
			return;
		}
		issues = null;
	}, 500);

	const onclick = async () => {
		isLoading = true;
		const { error } = await setUsername(username);
		isLoading = false;

		if (error) {
			issues = { username: [error.message] };
			return;
		}
		issues = null;

		toast.success('Username set successfully!');

		afterContinue();
	};
</script>

<Field>
	<FieldLabel for="username-{id}">Username</FieldLabel>
	<Input
		oninput={() => {
			validate({ username });
			isLoading = true;
			isAvailable = false;
			debounceUsername();
		}}
		bind:value={username}
		id="username-{id}"
		type="text"
		required
		aria-invalid={!!issues?.username}
	/>
	{#if issues}
		{#each issues?.username as issue (issue)}
			<FieldError>{issue}</FieldError>
		{/each}
	{:else if isAvailable}
		<FieldDescription class="text-green-600">
			Username is available!
		</FieldDescription>
	{:else if isLoading}
		<FieldDescription>Checking username availability...</FieldDescription>
	{:else if !username}
		<FieldDescription>
			Enter a unique username between 3 and 20 characters.
		</FieldDescription>
	{/if}
</Field>
<Button
	class="w-full cursor-pointer"
	{onclick}
	disabled={!!issues || !username || isLoading}
>
	{#if isLoading}
		<LoaderCircle class="size-4 animate-spin" />
	{:else}
		Save
	{/if}
</Button>
