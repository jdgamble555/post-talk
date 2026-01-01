<script lang="ts">
	import Footer from './footer.svelte';
	import Header from './header.svelte';
	import LeftSidebar from './left-sidebar.svelte';
	import RightSidebar from './right-sidebar.svelte';

	const { children } = $props();
</script>

<div class="flex min-h-screen w-full flex-col font-sans antialiased dark:bg-[#0e0b0e]">
	<Header />
	<div class="flex grow justify-center">
		<div class="flex w-full max-w-7xl justify-center">
			<aside class="z-40 hidden w-72 flex-none md:flex">
				<div
					class="fixed flex h-full w-72 flex-col p-4 dark:border dark:border-t-0 dark:border-b-0 dark:border-[#372536] dark:bg-black dark:text-white"
				>
					<LeftSidebar />
				</div>
			</aside>
			<main class="w-full">
				{@render children()}
			</main>
			<div class="hidden w-72 flex-none lg:block">
				<div
					class="fixed h-full w-72 p-4 dark:border dark:border-t-0 dark:border-b-0 dark:border-[#372536] dark:bg-black dark:text-fuchsia-100"
				>
					<RightSidebar />
				</div>
			</div>
		</div>
	</div>
	<div class="flex-none md:hidden">
		<Footer />
	</div>
</div>
