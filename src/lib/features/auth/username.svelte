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
	import * as v from 'valibot';
	import { UsernameSchema } from '$lib/features/auth/username-schema';
	import { LoaderCircle } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';

	const { afterContinue = () => {} }: { afterContinue?: () => void } = $props();

	const id = $props.id();

	let isError = $state<false | string>(false);
	let isLoading = $state<boolean>(false);
	let isAvailable = $state<boolean>(false);

	let username = $state<string>('');

	const { usernameAvailable, setUsername } = useUsername();

	const validate = () => {
		const result = v.safeParse(UsernameSchema, { username });

		if (!result.success) {
			isError = result.issues[0].message;
			return;
		}
		isLoading = true;
		isError = false;
		isAvailable = false;
	};

	const debounceUsername = useDebounce(async () => {
		if (isError) return;

		const { error: availableError, available } =
			await usernameAvailable(username);

		isLoading = false;

		if (availableError) {
			isError = availableError.message;
			return;
		}

		isAvailable = available;

		if (!available) {
			isError = 'Username is already taken.';
			return;
		}
		isError = false;
	}, 500);

	const onclick = async () => {
		isLoading = true;
		const { error } = await setUsername(username);
		isLoading = false;

		if (error) {
			isError = error.message;
			return;
		}
		isError = false;

		toast.success('Username set successfully!');

		afterContinue();
	};
</script>

<Field>
	<FieldLabel for="username-{id}">Username</FieldLabel>
	<Input
		oninput={() => {
			validate();
			debounceUsername();
		}}
		bind:value={username}
		id="username-{id}"
		type="text"
		required
		aria-invalid={!!isError}
	/>
	{#if isError}
		<FieldError>{isError}</FieldError>
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
	disabled={!!isError || !username || isLoading}
>
	{#if isLoading}
		<LoaderCircle class="size-4 animate-spin" />
	{:else}
		Save
	{/if}
</Button>
