<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Card from '$lib/components/ui/card';
	import Username from './username.svelte';
	import { resolve } from '$app/paths';

	const afterContinue = async () => {
		await goto(resolve('/home'));
	};
</script>

<div class="mt-8 px-5 sm:mt-16">
	<Card.Root class="mx-auto max-w-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Username</Card.Title>
			<Card.Description>Create your username.</Card.Description>
		</Card.Header>
		<Card.Content class="flex flex-col gap-5">
			<Username {afterContinue} />
		</Card.Content>
	</Card.Root>
</div>
