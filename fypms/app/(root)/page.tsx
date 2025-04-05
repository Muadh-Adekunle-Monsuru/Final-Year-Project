import { getUserDetails } from '@/lib/auth';
import { User } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import CoordinatorDashboard from '@/components/dashboard/CoordinatorDashboard';
import StudentDashboard from '@/components/dashboard/StudentDashboard';

export default async function Home() {
	const session = await getServerSession(options);
	const user = await getUserDetails(session?.user.name);
	return (
		<div className='min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]'>
			<div className='flex items-start gap-2'>
				<User className='size-6' />
				<h1 className='text-xl font-bold uppercase'>
					{user.role} {user.firstName} {user.lastName}
				</h1>
			</div>
			{user.role == 'COORDINATOR' && <CoordinatorDashboard />}
			{user.role == 'STUDENT' && <StudentDashboard student={user} />}
		</div>
	);
}
