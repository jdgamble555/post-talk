<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Ellipsis, Pencil, Trash } from '@lucide/svelte';
	import { resolve } from '$app/paths';
	import { useUser } from '$lib/shared/use-user.svelte';
	import PostDeleteDialog from './post-delete-dialog.svelte';

	const { id, createdBy }: { id: string; createdBy: string } = $props();

	const user = useUser();
	const userData = $derived(user.current.data);

	let open = $state(false);
</script>

<PostDeleteDialog {id} bind:open />
<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="ghost" class="size-8 p-0">
				<span class="sr-only">Open menu</span>
				<Ellipsis class="size-4" />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Group>
			{#if userData?.uid === createdBy}
				<DropdownMenu.Item>
					<a class="flex items-center gap-3" href={resolve('/')}>
						<Pencil class="size-4" />
						Edit Post
					</a>
				</DropdownMenu.Item>
				<DropdownMenu.Item
					class="flex cursor-pointer items-center gap-3"
					onclick={() => (open = true)}
				>
					<Trash class="size-4" /> Delete Post
				</DropdownMenu.Item>
			{/if}
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
