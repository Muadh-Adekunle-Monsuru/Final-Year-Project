import React from 'react';
import StudentCard from '@/components/dashboard/StudentCard';
import SupervisorCard from '@/components/dashboard/SupervisorCard';
import AllocationCard from '@/components/dashboard/AllocationCard';
import PastProjectCard from '@/components/dashboard/PastProjectCard';
import DeadlineCard from '@/components/dashboard/DeadlineCard';

export default function CoordinatorDashboard() {
	return (
		<div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
			<StudentCard />
			<SupervisorCard />
			<AllocationCard />
			<PastProjectCard />
			<div className='md:col-span-2 xl:col-span-4'>
				<DeadlineCard />
			</div>
		</div>
	);
}
