<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<div class="relative py-24 sm:py-32 md:py-40">
	<div class="mx-auto flex max-w-7xl flex-col gap-16 px-4 sm:gap-y-24 sm:px-6 lg:px-8">
		<div class="text-center">
			<h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl dark:text-white">
				Post.<span class="text-gray-500">Talk</span>
			</h1>
			<div class="mt-6 text-lg tracking-tight text-gray-600 dark:text-gray-300">
				Post about whatever topic you want, follow other users, and engage in discussions!
			</div>
			<div class="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3">
				<Button href="/login">Get Started</Button>
			</div>
		</div>
	</div>
</div>
