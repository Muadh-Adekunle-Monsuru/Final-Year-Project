import DashboardSummaryCard from '@/components/dashboard/DashboardSummaryCard';
import { getPastQuestions } from '@/lib/auth';

export default async function PastProjectCard() {
	const data = await getPastQuestions();

	return (
		<DashboardSummaryCard
			title={`${data.length} past projects`}
			href='/past-projects'
			emptyMessage='No past projects yet.'
			items={data.slice(0, 5).map((paper) => ({
				id: paper.id,
				label: paper.title,
			}))}
		/>
	);
}
