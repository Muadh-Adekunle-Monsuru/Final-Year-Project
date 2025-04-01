import AccorditionComponent from '@/components/AccorditionComponent';
import Allocation from '@/components/allocation-component';
import GroupedAllocation from '@/components/GroupedAllocation';
import NewAllocationComponent from '@/components/NewAllocationComponent';
import { allocateSupervisors, getStudents, getUserDetails } from '@/lib/auth';
import { prisma } from '@/lib/client';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function page() {
	const session = await getServerSession();
	const user = await getUserDetails(session?.user.name);
	if (user.role !== 'COORDINATOR') {
		redirect('/');
	}
	const pastAllocations = await prisma.allocation.findMany({});
	return (
		<div className='min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)] w-full'>
			<h1 className='text-4xl font-bold'>Allocate Supervisors</h1>
			<p className='text-lg'>
				This is where students are allocated a supervisor.
			</p>
			<NewAllocationComponent />
			<p className='font-bold mt-10 pl-6'>Past Allocations</p>
			<AccorditionComponent allocations={pastAllocations} />
		</div>
	);
}
