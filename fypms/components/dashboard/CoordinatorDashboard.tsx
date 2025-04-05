import React from 'react';
import StudentCard from '@/components/dashboard/StudentCard';
import SupervisorCard from '@/components/dashboard/SupervisorCard';
import AllocationCard from '@/components/dashboard/AllocationCard';
import PastProjectCard from '@/components/dashboard/PastProjectCard';
import DeadlineCard from '@/components/dashboard/DeadlineCard';
export default function CoordinatorDashboard() {
	return (
		<div className='flex flex-wrap justify-around gap-5 mt-5'>
			<StudentCard />
			<SupervisorCard />
			<AllocationCard />
			<PastProjectCard />
			<DeadlineCard />
		</div>
	);
}
