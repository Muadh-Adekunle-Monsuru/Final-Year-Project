import { LoginForm } from '@/components/login-form';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Page() {
	const session = await getServerSession();
	if (session) {
		redirect('/');
		return;
	}
	return (
		<div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
			<div className='w-full max-w-sm'>
				<LoginForm />
			</div>
		</div>
	);
}
