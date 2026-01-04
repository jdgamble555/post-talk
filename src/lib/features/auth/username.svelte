<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import {
		Field,
		FieldLabel,
		FieldDescription,
		FieldError
	} from '$lib/components/ui/field/index.js';
	import { useDebounce } from '$lib/shared/use-debounce';
	import { useUsername } from '$lib/shared/use-username';
	import * as v from 'valibot';
	import { UsernameSchema } from '$lib/features/auth/username-schema';
	import { LoaderCircle } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { toast } from 'svelte-sonner';
	import { cn } from '$lib/utils';
	import BackBar from '$lib/shared/back-bar.svelte';
	import { useUser } from '$lib/shared/firebase/use-user.svelte';

	const { isChangeUserName = false }: { isChangeUserName?: boolean } = $props();

	const user = useUser();

	const currentUsername = $derived(user.current.data?.username ?? '');

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
		const { error } = await setUsername(username);

		if (error) {
			isError = error.message;
			return;
		}
		isError = false;

		toast.success('Username set successfully!');

		if (isChangeUserName) {
			return;
		}
		await goto(resolve('/home'));
	};
</script>

<div class="flex flex-col gap-5">
	{#if isChangeUserName}
		<BackBar title="Change Username" href="/settings" />
	{/if}
	<div class={cn('px-5', !isChangeUserName ? 'mt-8 sm:mt-16' : '')}>
		<Card.Root class={cn('mx-auto', isChangeUserName ? '' : 'max-w-sm')}>
			<Card.Header>
				<Card.Title class="text-2xl">Username</Card.Title>
				<Card.Description>
					{#if isChangeUserName}
						Change your username. Your current username is
						<span class="font-bold">{currentUsername}</span>.
					{:else}
						Create your username.
					{/if}
				</Card.Description>
			</Card.Header>
			<Card.Content class="flex flex-col gap-5">
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
					/>
					{#if isError}
						<FieldError>{isError}</FieldError>
					{:else if isAvailable}
						<FieldDescription class="text-green-600">
							Username is available!
						</FieldDescription>
					{:else if isLoading}
						<FieldDescription
							>Checking username availability...</FieldDescription
						>
					{:else if !username}
						<FieldDescription>
							Enter a unique username between 3 and 20 characters.
						</FieldDescription>
					{/if}
				</Field>
			</Card.Content>
			<Card.Footer>
				<Button
					class="w-full cursor-pointer"
					{onclick}
					disabled={!!isError || !username || isLoading}
				>
					{#if isLoading}
						<LoaderCircle class="size-4 animate-spin" />
					{:else}
						Continue
					{/if}
				</Button>
			</Card.Footer>
		</Card.Root>
	</div>
</div>
