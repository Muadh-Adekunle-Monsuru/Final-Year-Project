import DashboardSummaryCard from '@/components/dashboard/DashboardSummaryCard';
import { getEvents } from '@/lib/auth';

export default async function DeadlineCard() {
	const deadlines = await getEvents();
	const data = deadlines.sort(
		(a, b) =>
			new Date(JSON.parse(a.date)[0]).getTime() -
			new Date(JSON.parse(b.date)[0]).getTime()
	);

	return (
		<DashboardSummaryCard
			title={`${data.length} deadlines`}
			href='/deadlines'
			emptyMessage='No deadlines set yet.'
			items={data.slice(0, 5).map((paper) => ({
				id: paper.id,
				label: paper.name,
			}))}
		/>
	);
}
