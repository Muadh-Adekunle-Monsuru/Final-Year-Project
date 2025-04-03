import { getUserDetails } from '@/lib/auth';
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
			<h1 className='text-4xl font-bold'>Settings</h1>
			<p className='text-lg'>Change settings</p>
		</div>
	);
}
