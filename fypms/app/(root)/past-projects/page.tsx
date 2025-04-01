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
	return (
		<div className='min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)] w-full'>
			<h1 className='text-4xl font-bold'>View Past Projects</h1>
			<p className='text-lg'>
				This is where students past projects are viewed.
			</p>
		</div>
	);
}
