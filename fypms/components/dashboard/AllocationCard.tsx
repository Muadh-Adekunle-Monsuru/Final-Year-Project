import DashboardSummaryCard from '@/components/dashboard/DashboardSummaryCard';
import { prisma } from '@/lib/client';

export default async function AllocationCard() {
	const pastAllocations = await prisma.allocation.findMany({
		orderBy: { isActive: 'desc' },
	});

	return (
		<DashboardSummaryCard
			title={`${pastAllocations.length} saved allocations`}
			href='/allocation'
			emptyMessage='No allocations saved yet.'
			items={pastAllocations.slice(0, 5).map((allocation) => ({
				id: allocation.id,
				label: allocation.isActive
					? `${allocation.name} (Active)`
					: allocation.name,
			}))}
		/>
	);
}
