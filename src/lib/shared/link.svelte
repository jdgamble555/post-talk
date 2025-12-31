<script lang="ts">
	import type { Snippet } from 'svelte';
	import { resolve } from '$app/paths';
	import { type HTMLAnchorAttributes } from 'svelte/elements';

	type HTMLAnchor = HTMLAnchorAttributes & {
		href: Parameters<typeof resolve>[0];
		children?: Snippet;
	};

	const { href, children, ...restProps }: HTMLAnchor = $props();
</script>

<a {...restProps} href={resolve(href)}>
	{@render children?.()}
</a>
