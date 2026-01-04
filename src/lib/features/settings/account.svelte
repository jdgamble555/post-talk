<script lang="ts">
	import * as Field from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import * as Card from '$lib/components/ui/card';
	import BackBar from '$lib/shared/back-bar.svelte';
</script>

<div class="flex flex-col gap-5">
	<BackBar title="Account Settings" href="/settings" />
	<div class="px-5">
		<Card.Root>
			<Card.Header>
				<Card.Title class="text-2xl">Settings</Card.Title>
				<Card.Description>
					Edit your profile and account settings.
				</Card.Description>
			</Card.Header>
			<Card.Content class="flex flex-col gap-5">
				<Field.Set>
					<Field.Legend>Profile</Field.Legend>
					<Field.Description>
						This appears on invoices and emails.
					</Field.Description>
					<Field.Group>
						<Field.Field>
							<Field.Label for="name">Full name</Field.Label>
							<Input id="name" autocomplete="off" placeholder="Evil Rabbit" />
							<Field.Description>
								This appears on invoices and emails.
							</Field.Description>
						</Field.Field>
						<Field.Field>
							<Field.Label for="username">Username</Field.Label>
							<Input id="username" autocomplete="off" aria-invalid />
							<Field.Error>Choose another username.</Field.Error>
						</Field.Field>
						<Field.Field orientation="horizontal">
							<Switch id="newsletter" />
							<Field.Label for="newsletter">
								Subscribe to the newsletter
							</Field.Label>
						</Field.Field>
					</Field.Group>
				</Field.Set>
			</Card.Content>
			<Card.Footer></Card.Footer>
		</Card.Root>
	</div>
</div>
