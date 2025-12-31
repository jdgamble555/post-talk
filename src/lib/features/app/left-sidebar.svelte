<script lang="ts">
	import House from '@lucide/svelte/icons/house';
	import Bookmark from '@lucide/svelte/icons/bookmark';
	import Bell from '@lucide/svelte/icons/bell';
	import User from '@lucide/svelte/icons/user';
	import Settings from '@lucide/svelte/icons/settings';
	import { Button } from '$lib/components/ui/button';
</script>

<Button variant="ghost" href="/home">
	<House class="size-8 min-w-8" />
	Home
</Button>
<Button variant="ghost">
	<Bookmark class="size-8 min-w-8" />
	Bookmarks
</Button>
<Button variant="ghost">
	<Bell class="size-8 min-w-8" />
	Notifications
</Button>
<Button variant="ghost">
	<User class="size-8 min-w-8" />
	Profile
</Button>
<Button variant="ghost" href="/settings">
	<Settings class="size-8 min-w-8" />
	Settings
</Button>
