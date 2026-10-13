import AccorditionComponent from '@/components/AccorditionComponent';
import NewAllocationComponent from '@/components/NewAllocationComponent';
import { getUserDetails } from '@/lib/auth';
import { prisma } from '@/lib/client';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Page() {
	const session = await getServerSession();
	const user = await getUserDetails(session?.user.name);
	if (user.role !== 'COORDINATOR') {
		redirect('/');
	}
	const pastAllocations = await prisma.allocation.findMany({
		orderBy: { isActive: 'desc' },
	});
	const activeAllocation = pastAllocations.find((allocation) => allocation.isActive);

	return (
		<div className='min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)] w-full'>
			<h1 className='text-4xl font-bold'>Allocate Supervisors</h1>
			<p className='text-lg'>
				Generate and save draft allocations. Use &quot;Use this as allocation&quot;
				on a saved draft to make it live on student and supervisor portals.
			</p>
			{activeAllocation ? (
				<p className='mt-2 text-sm text-muted-foreground'>
					Currently active: <span className='font-medium text-foreground'>{activeAllocation.name}</span>
				</p>
			) : (
				<p className='mt-2 text-sm text-muted-foreground'>
					No allocation is currently active on the portals.
				</p>
			)}
			<NewAllocationComponent />
			<p className='font-bold mt-10 pl-6'>Past Allocations</p>
			<AccorditionComponent allocations={pastAllocations} />
		</div>
	);
}
