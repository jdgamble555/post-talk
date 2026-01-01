<script lang="ts">
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Kbd from '$lib/components/ui/kbd/index.js';
	import SearchIcon from '@lucide/svelte/icons/search';
	import { useIsMac } from '$lib/shared/use-is-mac.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import ModeSwitcher from './mode-switcher.svelte';

	const isMac = useIsMac();

	let open = $state(false);

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			open = !open;
		}
	}
</script>

<svelte:document onkeydown={handleKeydown} />

<div class="flex flex-col gap-4">
	<div class="flex items-center justify-end">
		<ModeSwitcher />
	</div>
	<Button variant="ghost" class=" flex w-full justify-between border" onclick={() => (open = true)}>
		<div class="flex items-center gap-3 text-accent-foreground/50">
			<SearchIcon />
			<span class="w-full text-accent-foreground/50">Search...</span>
		</div>
		<Kbd.Group>
			<Kbd.Root class="border">{isMac.current ? '⌘' : 'Ctrl'}</Kbd.Root>
			<Kbd.Root class="border">K</Kbd.Root>
		</Kbd.Group>
	</Button>
	<Command.Dialog bind:open>
		<Command.Input placeholder="Type a command or search..." />
		<Command.List>
			<Command.Empty>No results found.</Command.Empty>
			<Command.Group heading="Suggestions">
				<Command.Item>Calendar</Command.Item>
				<Command.Item>Search Emoji</Command.Item>
				<Command.Item>Calculator</Command.Item>
			</Command.Group>
			<Command.Separator />
			<Command.Group heading="Settings">
				<Command.Item>Profile</Command.Item>
				<Command.Item>Billing</Command.Item>
				<Command.Item>Settings</Command.Item>
			</Command.Group>
		</Command.List>
	</Command.Dialog>
</div>
