<script lang="ts">
	import House from '@lucide/svelte/icons/house';
	import Bookmark from '@lucide/svelte/icons/bookmark';
	import Bell from '@lucide/svelte/icons/bell';
	import User from '@lucide/svelte/icons/user';
	import Settings from '@lucide/svelte/icons/settings';
	import { Button } from '$lib/components/ui/button';
</script>

<div class="flex flex-col items-start gap-4 p-4">
	<h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
		Post.<span class="text-gray-500">Talk</span>
	</h1>
	<Button variant="ghost" href="/home">
		<House class="size-8" />
		Home
	</Button>
	<Button variant="ghost">
		<Bookmark class="size-8" />
		Bookmarks
	</Button>
	<Button variant="ghost">
		<Bell class="size-8" />
		Notifications
	</Button>
	<Button variant="ghost">
		<User class="size-8" />
		Profile
	</Button>
	<Button variant="ghost" href="/settings">
		<Settings class="size-8" />
		Settings
	</Button>
</div>
