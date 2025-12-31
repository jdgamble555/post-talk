<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	const { children } = $props();
</script>

<Button variant="ghost" class="" href="/home">
	{@render children?.()}
</Button>
