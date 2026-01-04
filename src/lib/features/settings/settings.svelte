<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import BackBar from '$lib/shared/back-bar.svelte';
	import { ChevronRight } from '@lucide/svelte';
</script>

<div class="flex flex-col gap-5">
	<BackBar title="Settings" href="/home" />
	<div>
		<Button variant="ghost" class="h-12 w-full" href="/settings/profile">
			<div class="flex w-full justify-between gap-3 p-5">
				Profile Settings
				<ChevronRight class="size-5" />
			</div>
		</Button>
		<Button variant="ghost" class="h-12 w-full" href="/settings/username">
			<div class="flex w-full justify-between gap-3 p-5">
				Change Username
				<ChevronRight class="size-5" />
			</div>
		</Button>
		<Button variant="ghost" class="h-12 w-full" href="/settings/email">
			<div class="flex w-full justify-between gap-3 p-5">
				Change Email
				<ChevronRight class="size-5" />
			</div>
		</Button>
	</div>
</div>
