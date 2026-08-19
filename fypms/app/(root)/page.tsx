import { getUserDetails } from '@/lib/auth';
import { User } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import CoordinatorDashboard from '@/components/dashboard/CoordinatorDashboard';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
import SupervisorDashboard from '@/components/dashboard/SupervisorDashboard';
import { SchoolLogo } from '@/components/SchoolLogo';

export default async function Home() {
	const session = await getServerSession(options);
	const user = await getUserDetails(session?.user.name);
	return (
		<div className='min-h-screen p-6 pb-20 sm:p-8 font-[family-name:var(--font-geist-sans)]'>
			<div className='mb-6 flex items-center gap-3'>
				<SchoolLogo className='size-10 shrink-0' />
				<div className='flex items-center gap-2'>
					<User className='size-6 text-primary' />
					<h1 className='text-xl font-bold uppercase tracking-tight'>
						{user.role} {user.firstName} {user.lastName}
					</h1>
				</div>
			</div>
			{user.role == 'COORDINATOR' && <CoordinatorDashboard />}
			{user.role == 'STUDENT' && <StudentDashboard student={user} />}
			{user.role == 'SUPERVISOR' && <SupervisorDashboard supervisor={user} />}
		</div>
	);
}
