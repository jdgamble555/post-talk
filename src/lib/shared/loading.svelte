<script lang="ts">
	import { LoaderCircle } from '@lucide/svelte';
</script>

<div class="flex min-h-screen items-center justify-center">
	<div class="mx-auto flex max-w-7xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<h1
				class="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl dark:text-white"
			>
				Post.<span class="text-gray-500">Talk</span>
			</h1>

			<div class="mt-10 flex justify-center">
				<LoaderCircle
					class="size-8 animate-spin text-gray-600 dark:text-gray-300"
				/>
			</div>
		</div>
	</div>
</div>
