<script lang="ts">
	import {
		Badge,
		Button,
		Card,
		Checkbox,
		Field,
		Input,
		NativeSelect,
		Textarea
	} from '$lib/components';

	let cardName = $state('Jawe Ordillano');
	let cardNumber = $state('4242 4242 4242 4242');
	let cvv = $state('128');
	let month = $state('08');
	let year = $state('2028');
	let billingSameAsShipping = $state(true);
	let orderNotes = $state('Send the receipt to finance@sprix.dev.');
</script>

<div class="grid gap-4 lg:grid-cols-2">
	<Card title="Card details" class="rounded-3xl border-app-border bg-app-surface">
		{#snippet action()}
			<Badge role="success" variant="modern">Secure checkout</Badge>
		{/snippet}

		<div class="grid gap-5">
			<div class="grid gap-4 md:grid-cols-2">
				<div class="md:col-span-2">
					<Field label="Name on card" name="payment-name">
						<Input bind:value={cardName} placeholder="Jawe Ordillano" />
					</Field>
				</div>

				<div class="md:col-span-2">
					<Field label="Card number" name="payment-card-number">
						<Input bind:value={cardNumber} inputmode="numeric" placeholder="4242 4242 4242 4242" />
					</Field>
				</div>

				<Field label="CVV" name="payment-cvv">
					<Input bind:value={cvv} inputmode="numeric" placeholder="123" />
				</Field>

				<div class="grid grid-cols-2 gap-4">
					<Field label="Month" name="payment-month">
						<NativeSelect bind:value={month}>
							<option value="01">01</option>
							<option value="02">02</option>
							<option value="03">03</option>
							<option value="04">04</option>
							<option value="05">05</option>
							<option value="06">06</option>
							<option value="07">07</option>
							<option value="08">08</option>
							<option value="09">09</option>
							<option value="10">10</option>
							<option value="11">11</option>
							<option value="12">12</option>
						</NativeSelect>
					</Field>

					<Field label="Year" name="payment-year">
						<NativeSelect bind:value={year}>
							<option value="2026">2026</option>
							<option value="2027">2027</option>
							<option value="2028">2028</option>
							<option value="2029">2029</option>
							<option value="2030">2030</option>
						</NativeSelect>
					</Field>
				</div>
			</div>

			<div class="rounded-2xl border border-app-border bg-app-bg px-4 py-4">
				<div class="space-y-4">
					<p class="text-sm font-medium text-app-text">Billing</p>

					<Checkbox bind:checked={billingSameAsShipping} label="Billing address matches shipping" />
				</div>
			</div>

			<Field label="Notes" name="payment-comments">
				<Textarea bind:value={orderNotes} rows={4} resize="vertical" />
			</Field>
		</div>

		{#snippet footer()}
			<div class="mt-4 flex flex-wrap justify-end gap-3">
				<Button role="secondary" variant="outline">Cancel</Button>
				<Button>Submit payment</Button>
			</div>
		{/snippet}
	</Card>

	<Card title="Order summary" class="rounded-3xl border-app-border bg-app-surface">
		<div class="grid gap-4">
			<div class="rounded-2xl border border-app-border bg-app-bg px-4 py-4">
				<div class="flex items-center justify-between gap-3 text-sm">
					<span class="text-app-text-muted">Sprix Pro annual</span>
					<span class="font-medium text-app-text">$240</span>
				</div>
				<div class="mt-3 flex items-center justify-between gap-3 text-sm">
					<span class="text-app-text-muted">Tax</span>
					<span class="font-medium text-app-text">$24</span>
				</div>
				<div class="mt-4 border-t border-app-border pt-4">
					<div class="flex items-center justify-between gap-3">
						<span class="font-medium text-app-text">Total due</span>
						<span class="text-lg font-semibold text-app-text">$264</span>
					</div>
				</div>
			</div>

			<div class="flex flex-wrap gap-3">
				<Badge role="secondary" variant="badge">Encryption active</Badge>
				<Badge role="primary" variant="badge">Receipts enabled</Badge>
				<Badge role="success" variant="badge-color">Invoice ready</Badge>
			</div>
		</div>
	</Card>
</div>
