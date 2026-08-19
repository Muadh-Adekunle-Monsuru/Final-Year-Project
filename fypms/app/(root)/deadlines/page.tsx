import CalendarForm from '@/components/CalendarForm';
import EventList from '@/components/EventList';
import { getEvents, getUserDetails } from '@/lib/auth';
import { getServerSession } from 'next-auth';

const roleCopy: Record<string, { subtitle: string; hint: string }> = {
	STUDENT: {
		subtitle: 'Project milestones you need to meet',
		hint: 'Work towards the next due date. Items marked overdue have already passed.',
	},
	SUPERVISOR: {
		subtitle: 'Milestone dates for the students you supervise',
		hint: 'Use this schedule when reviewing progress and reminding students of upcoming submissions.',
	},
	COORDINATOR: {
		subtitle: 'Set and manage FYP milestones for everyone',
		hint: 'Add a named deadline and pick one date, or several dates for a submission window.',
	},
};

export default async function Page() {
	const session = await getServerSession();
	const user = await getUserDetails(session?.user.name);
	const copy = roleCopy[user.role] ?? roleCopy.STUDENT;

	const deadlines = await getEvents();
	const sorted = deadlines.sort(
		(a, b) =>
			new Date(JSON.parse(a.date)[0]).getTime() -
			new Date(JSON.parse(b.date)[0]).getTime()
	);

	return (
		<div className='min-h-screen w-full p-6 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-8'>
			<h1 className='text-4xl font-bold'>Deadlines</h1>
			<p className='mt-1 text-lg text-muted-foreground'>{copy.subtitle}</p>
			<p className='mt-1 max-w-2xl text-sm text-muted-foreground'>
				{copy.hint}
			</p>
			<div className='mt-8 flex flex-col gap-8 lg:flex-row lg:items-start'>
				{user.role === 'COORDINATOR' && <CalendarForm />}
				<EventList
					events={sorted}
					isCoordinator={user.role === 'COORDINATOR'}
				/>
			</div>
		</div>
	);
}
