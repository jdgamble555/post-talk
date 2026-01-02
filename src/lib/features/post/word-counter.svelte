<script lang="ts">
	import SvgCircle from '$lib/shared/svg-circle.svelte';

	const CHARACTER_LIMIT = 280;

	const { content }: { content: string } = $props();

	const progress = $derived(((content.length / CHARACTER_LIMIT) * 100) | 0);

	const display_characters = $derived(CHARACTER_LIMIT - content.length);

	const color = $derived(display_characters < 0 ? 'red' : '#000000');
</script>

<div class="flex items-center gap-3">
	<span class="text-primary/60">{display_characters}</span>
	<SvgCircle {progress} width={3} size={25} strokeColor={color} trailColor="#d1d5db"></SvgCircle>
</div>
