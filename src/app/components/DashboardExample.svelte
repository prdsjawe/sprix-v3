<script lang="ts">
	import {
		Avatar,
		Badge,
		Card,
		Progress,
		Table,
		TBody,
		TColumn,
		THeader,
		TRow
	} from '$lib/components';

	const metrics = [
		{ label: 'Revenue', value: '$48.2k', change: '+12%' },
		{ label: 'Active users', value: '12.4k', change: '+6%' },
		{ label: 'Resolved tickets', value: '184', change: '+18%' }
	] as const;

	const incidents = [
		{ team: 'Platform', owner: 'Emma Li', status: 'Healthy' },
		{ team: 'Content', owner: 'Mina Park', status: 'Monitoring' },
		{ team: 'Growth', owner: 'Lara Ong', status: 'Ready' }
	] as const;
</script>

<div class="grid gap-4">
	<div class="grid gap-4 xl:grid-cols-3">
		<Card title="Overview" class="rounded-3xl border-app-border bg-app-surface xl:col-span-2">
			<div class="grid gap-4 md:grid-cols-3">
				{#each metrics as metric}
					<div class="rounded-2xl border border-app-border bg-app-bg px-4 py-4">
						<p class="text-sm text-app-text-muted">{metric.label}</p>
						<p class="mt-2 text-2xl font-semibold tracking-tight text-app-text">{metric.value}</p>
						<p class="mt-1 text-sm text-app-text-subtle">{metric.change} from last week</p>
					</div>
				{/each}
			</div>

			<div class="mt-5 space-y-3">
				<div class="flex items-center justify-between gap-3">
					<p class="text-sm font-medium text-app-text">Quarterly target</p>
					<Badge role="primary" variant="modern">84% complete</Badge>
				</div>
				<Progress value={84} ariaLabel="Quarterly target progress" />
			</div>
		</Card>

		<Card title="Current owner" class="rounded-3xl border-app-border bg-app-surface">
			<div class="flex items-start gap-4 rounded-2xl border border-app-border bg-app-bg px-4 py-4">
				<Avatar name="Emma Li" size="2xl" />
				<div class="space-y-2">
					<div>
						<p class="font-medium text-app-text">Emma Li</p>
						<p class="text-sm text-app-text-muted">
							Operations lead for launch readiness and incident review.
						</p>
					</div>
					<Badge role="success" variant="badge-color">On schedule</Badge>
				</div>
			</div>
		</Card>
	</div>

	<Card title="Team status" class="rounded-3xl border-app-border bg-app-surface">
		<Table ariaLabel="Team dashboard status">
			<THeader>
				<TRow>
					<TColumn>Team</TColumn>
					<TColumn>Owner</TColumn>
					<TColumn>Status</TColumn>
				</TRow>
			</THeader>
			<TBody>
				{#each incidents as row}
					<TRow>
						<TColumn>{row.team}</TColumn>
						<TColumn>{row.owner}</TColumn>
						<TColumn>{row.status}</TColumn>
					</TRow>
				{/each}
			</TBody>
		</Table>
	</Card>
</div>
