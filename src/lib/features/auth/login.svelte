<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Link from '$lib/shared/link.svelte';
	import LoginWithGoogle from './login-with-google.svelte';
</script>

<div class="mt-8 px-5 sm:mt-16">
	<Card.Root class="mx-auto max-w-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Login</Card.Title>
			<Card.Description>Enter your email below to login to your account</Card.Description>
		</Card.Header>
		<Card.Content class="flex flex-col gap-5">
			<div class="grid gap-6">
				<!-- TODO: Login with Email -->
				<div class="relative">
					<div class="absolute inset-0 flex items-center">
						<span class="w-full border-t"></span>
					</div>
					<div class="relative flex justify-center text-xs uppercase">
						<span class="bg-background px-2 text-muted-foreground"> Or continue with </span>
					</div>
				</div>
				<div class="flex flex-col gap-3">
					<LoginWithGoogle />
				</div>
			</div>
			<p class="px-8 text-center text-sm text-muted-foreground">
				By clicking continue, you agree to our
				<Link href="/terms" class="underline underline-offset-4 hover:text-primary">
					Terms of Service
				</Link>
				and
				<Link href="/privacy" class="underline underline-offset-4 hover:text-primary">
					Privacy Policy
				</Link>
				.
			</p>
		</Card.Content>
	</Card.Root>
</div>
