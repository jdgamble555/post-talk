<script lang="ts">
	import type { Pathname } from '$app/types';
	import { Button } from '$lib/components/ui/button';
	import { ArrowLeft } from '@lucide/svelte';

	const { title, href }: { title: string; href?: Pathname } = $props();
</script>

<div class="flex h-16 items-center gap-3 border-b px-5">
	<Button variant="ghost" class="h-auto p-2" {href}>
		<ArrowLeft class="size-5" />
	</Button>
	<h2 class="text-lg font-semibold">{title}</h2>
</div>
