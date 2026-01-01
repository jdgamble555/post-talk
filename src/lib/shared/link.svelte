<script lang="ts">
	import type { Snippet } from 'svelte';
	import { resolve } from '$app/paths';
	import { type HTMLAnchorAttributes } from 'svelte/elements';
	import type { Pathname } from '$app/types';

	type HTMLAnchor = HTMLAnchorAttributes & {
		href: Pathname;
		children?: Snippet;
	};

	const { href, children, ...restProps }: HTMLAnchor = $props();
</script>

<a {...restProps} href={resolve(href)}>
	{@render children?.()}
</a>
