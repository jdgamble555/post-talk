<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		size = 150,
		width = 20,
		trailColor = 'gray',
		strokeColor = 'black',
		progress,
		children
	}: {
		size?: number;
		width?: number;
		trailColor?: string;
		strokeColor?: string;
		progress: number | string;
		children?: Snippet;
	} = $props();

	const cy = $derived(size / 2);
	const r = $derived(cy - width / 2);
	const circumference = $derived(2 * Math.PI * r);

	const dashOffset = $derived(circumference * (1 - Number(progress) / 100));
</script>

<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
	<circle cx={cy} {cy} {r} stroke={trailColor} fill="none" stroke-width={width} />
	<circle
		cx={cy}
		{cy}
		{r}
		fill="none"
		stroke={strokeColor}
		transform={`rotate(-90 ${cy} ${cy})`}
		stroke-dasharray={circumference}
		stroke-dashoffset={dashOffset}
		stroke-width={width}
		stroke-linecap="round"
	/>
	<foreignObject x="0" y="0" width={size} height={size}>
		<div class="flex size-full items-center justify-center">
			{@render children?.()}
		</div>
	</foreignObject>
</svg>
