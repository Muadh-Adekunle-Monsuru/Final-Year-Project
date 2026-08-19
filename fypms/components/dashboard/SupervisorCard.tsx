import DashboardSummaryCard from '@/components/dashboard/DashboardSummaryCard';
import { getSupervisors } from '@/lib/auth';

export default async function SupervisorCard() {
	const supervisors = await getSupervisors();
	return (
		<DashboardSummaryCard
			title={`${supervisors.length} supervisors`}
			href='/supervisors/add'
			emptyMessage='No supervisors registered yet.'
			items={supervisors.slice(0, 5).map((supervisor) => ({
				id: supervisor.id,
				label: `${supervisor.firstName} ${supervisor.lastName}`,
			}))}
		/>
	);
}
