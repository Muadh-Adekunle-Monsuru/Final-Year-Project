import { getUserDetails } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';

export default async function Home() {
	const session = await getServerSession(options);
	const user = await getUserDetails(session?.user.name);
	return (
		<div className='min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]'>
			<h1 className='text-4xl font-bold'>
				Welcome to FYPMS {user.firstName} {user.lastName}
			</h1>
			<p className='text-lg'>This is a Next.js app with authentication!</p>
		</div>
	);
}
