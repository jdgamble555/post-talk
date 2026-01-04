<script lang="ts">
	import House from '@lucide/svelte/icons/house';
	import Bookmark from '@lucide/svelte/icons/bookmark';
	import Bell from '@lucide/svelte/icons/bell';
	import User from '@lucide/svelte/icons/user';
	import Settings from '@lucide/svelte/icons/settings';
	import { Button } from '$lib/components/ui/button';
	import { useUser } from '$lib/shared/firebase/use-user.svelte';
	import type { Pathname } from '$app/types';
	import ProfileButton from './profile-button.svelte';

	const user = useUser();

	const profileURL = $derived(('/' + user.current.data!.username!) as Pathname);
</script>

<div class="flex flex-col justify-between h-full">
	<div class="flex flex-col items-start gap-8 p-4">
		<h1
			class="ml-5 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white"
		>
			Post.<span class="text-gray-500">Talk</span>
		</h1>
		<nav class="flex w-full flex-col gap-2 p-2">
			<Button
				class="w-full justify-start gap-5 p-8"
				variant="ghost"
				href="/home"
			>
				<House class="size-8" />
				Home
			</Button>
			<Button
				class="w-full justify-start gap-5 p-8"
				variant="ghost"
				href="/bookmarks"
			>
				<Bookmark class="size-8" />
				Bookmarks
			</Button>
			<Button class="w-full justify-start gap-5 p-8" variant="ghost">
				<Bell class="size-8" />
				Notifications
			</Button>
			<Button
				class="w-full justify-start gap-5 p-8"
				variant="ghost"
				href={profileURL}
			>
				<User class="size-8" />
				Profile
			</Button>
			<Button
				class="w-full justify-start gap-5 p-8"
				variant="ghost"
				href="/settings"
			>
				<Settings class="size-8" />
				Settings
			</Button>
		</nav>
	</div>
	<div class="mb-10 w-full">
		<ProfileButton />
	</div>
</div>
