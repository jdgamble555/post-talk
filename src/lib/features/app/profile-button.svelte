<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { useUser } from '$lib/shared/firebase/use-user.svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Ellipsis, LogOut, User } from '@lucide/svelte';
	import Logout from '../auth/logout.svelte';
	import type { Pathname } from '$app/types';

	const user = useUser();
	const currentUser = $derived(user.current.data);

	const fallback = $derived(
		currentUser?.username
			? currentUser.username.charAt(0).toUpperCase()
			: currentUser?.email?.charAt(0).toUpperCase() || 'P'
	);

	const profileURL = $derived('/' + currentUser?.username);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="ghost" class="cursor-pointer p-8">
				<div class="flex items-center justify-between gap-3">
					<Avatar.Root class="size-12">
						<Avatar.Image
							src={currentUser?.photoURL}
							alt={currentUser?.username
								? `${currentUser.username} profile`
								: 'Profile'}
						/>
						<Avatar.Fallback class="[html:not(.dark)_&]:bg-gray-200"
							>{fallback}</Avatar.Fallback
						>
					</Avatar.Root>
					<div class="flex flex-col items-start">
						<div class="font-bold text-ellipsis">
							{currentUser?.displayName}
						</div>
						<div class="text-ellipsis text-muted-foreground">
							@{currentUser?.username}
						</div>
					</div>
					<Ellipsis class="size-5" />
				</div>
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Group>
			<DropdownMenu.Label>My Account</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Item>
				<a href={resolve(profileURL as Pathname)} class="flex gap-4">
					<User class="size-4" />
					Profile
				</a>
			</DropdownMenu.Item>
			<DropdownMenu.Item class="flex gap-4">
				<LogOut class="size-4" />
				<Logout username={currentUser?.username || ''} />
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
