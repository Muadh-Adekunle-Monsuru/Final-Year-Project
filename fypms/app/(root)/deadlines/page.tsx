import CalendarForm from '@/components/CalendarForm';
import EventList from '@/components/EventList';
import { getEvents, getUserDetails } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Page() {
	const session = await getServerSession();
	const user = await getUserDetails(session?.user.name);
	if (user.role !== 'COORDINATOR') {
		redirect('/');
	}
	const deadlines = await getEvents();
	const sorted = deadlines.sort(
		(a, b) =>
			new Date(JSON.parse(a.date)[0]).getTime() -
			new Date(JSON.parse(b.date)[0]).getTime()
	);
	return (
		<div className='min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)] w-full'>
			<h1 className='text-4xl font-bold'>Create Deadlines</h1>
			<p className='text-lg'>Create project deadlines and millestones</p>
			<div className='flex flex-col lg:flex-row gap-5 mt-5'>
				<CalendarForm />
				<EventList events={sorted} />
			</div>
		</div>
	);
}
