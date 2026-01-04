<script lang="ts">
	import { page } from '$app/state';
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
    import { resolve } from '$app/paths';
</script>

<main class="flex items-center justify-center">
	<Card.Root class="m-3 mt-24 wrap-break-word">
		<Card.Header>
			<Card.Title class="text-2xl">Error</Card.Title>
			<Card.Description>It seems there has been an error, sorry about that.</Card.Description>
		</Card.Header>
		<Card.Content class="flex flex-col gap-3">
			{#if page?.error}
				<div class="grid grid-cols-[75px_1fr] gap-5">
					{#if page?.status}
						<span class="mr-2 font-bold">Status:</span>
						{page?.status}
					{/if}

					{#if page?.error?.message}
						<span class="mr-2 font-bold">Error:</span>
						{page?.error?.message}
					{/if}
				</div>
				<Separator />
				<div>Try:</div>
				<ul class="ml-10 list-disc">
					<li>
						<button class="underline hover:no-underline" onclick={() => history.back()}>
							Back
						</button>
					</li>
					<li class="list-item">
						<a class="underline hover:no-underline" href={resolve('/login')}>Login</a>
					</li>
					<li><a class="underline hover:no-underline" href={resolve('/')}>Home</a></li>
				</ul>
			{/if}
		</Card.Content>
	</Card.Root>
</main>
