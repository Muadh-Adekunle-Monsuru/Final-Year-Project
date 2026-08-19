'use client';
import { deleteEvent } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { Deadlines } from '@prisma/client';
import {
	format,
	formatDistanceToNow,
	isBefore,
	isWithinInterval,
	startOfDay,
} from 'date-fns';
import { CalendarClock, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

type DeadlineStatus = 'upcoming' | 'dueSoon' | 'ongoing' | 'overdue';

function parseDates(raw: string): Date[] {
	try {
		return JSON.parse(raw)
			.map((value: string) => new Date(value))
			.filter((date: Date) => !Number.isNaN(date.getTime()))
			.sort((a: Date, b: Date) => a.getTime() - b.getTime());
	} catch {
		return [];
	}
}

function getStatus(dates: Date[]): DeadlineStatus {
	const today = startOfDay(new Date());
	const start = startOfDay(dates[0]);
	const end = startOfDay(dates[dates.length - 1]);

	if (isBefore(end, today)) return 'overdue';
	if (dates.length > 1 && isWithinInterval(today, { start, end })) {
		return 'ongoing';
	}

	const daysUntil = Math.ceil(
		(start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
	);
	if (daysUntil <= 7) return 'dueSoon';
	return 'upcoming';
}

function formatDateRange(dates: Date[]) {
	if (dates.length === 1) return format(dates[0], 'EEE d MMM yyyy');
	return `${format(dates[0], 'EEE d MMM yyyy')} – ${format(
		dates[dates.length - 1],
		'EEE d MMM yyyy'
	)}`;
}

function relativeLabel(dates: Date[], status: DeadlineStatus) {
	const start = dates[0];
	const end = dates[dates.length - 1];
	if (status === 'overdue') {
		return `Passed ${formatDistanceToNow(end, { addSuffix: true })}`;
	}
	if (status === 'ongoing') return 'Window is open now';
	if (status === 'dueSoon') {
		return `Due ${formatDistanceToNow(start, { addSuffix: true })}`;
	}
	return `Starts ${formatDistanceToNow(start, { addSuffix: true })}`;
}

const statusStyles: Record<
	DeadlineStatus,
	{ label: string; className: string }
> = {
	upcoming: {
		label: 'Upcoming',
		className: 'bg-brand-muted text-primary',
	},
	dueSoon: {
		label: 'Due soon',
		className: 'bg-amber-100 text-amber-800',
	},
	ongoing: {
		label: 'Happening now',
		className: 'bg-sky-100 text-sky-800',
	},
	overdue: {
		label: 'Passed',
		className: 'bg-muted text-muted-foreground',
	},
};

export default function EventList({
	events,
	isCoordinator,
}: {
	events: Deadlines[];
	isCoordinator: boolean;
}) {
	const router = useRouter();

	const items = events
		.map((event) => {
			const dates = parseDates(event.date);
			if (dates.length === 0) return null;
			const status = getStatus(dates);
			return { event, dates, status };
		})
		.filter(Boolean) as {
		event: Deadlines;
		dates: Date[];
		status: DeadlineStatus;
	}[];

	const upcoming = items.filter((item) => item.status !== 'overdue');
	const passed = items.filter((item) => item.status === 'overdue');

	const handleDelete = async (id: string, name: string) => {
		if (!window.confirm(`Remove “${name}” from the deadline list?`)) return;
		await deleteEvent(id);
		router.refresh();
		toast.success('Deadline removed.');
	};

	if (items.length === 0) {
		return (
			<Card className='w-full gap-0 py-0 shadow-none'>
				<CardContent className='flex flex-col items-center px-6 py-12 text-center'>
					<CalendarClock className='mb-3 size-8 text-primary' />
					<p className='font-semibold'>No deadlines yet</p>
					<p className='mt-1 max-w-sm text-sm text-muted-foreground'>
						When the coordinator publishes milestones, they will show up here
						with due dates.
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className='min-w-0 flex-1 space-y-8'>
			<section>
				<h2 className='mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground'>
					Coming up ({upcoming.length})
				</h2>
				{upcoming.length === 0 ? (
					<p className='text-sm text-muted-foreground'>
						Nothing upcoming. Check passed milestones below.
					</p>
				) : (
					<ul className='space-y-3'>
						{upcoming.map((item) => (
							<DeadlineRow
								key={item.event.id}
								item={item}
								isCoordinator={isCoordinator}
								onDelete={handleDelete}
							/>
						))}
					</ul>
				)}
			</section>
			{passed.length > 0 && (
				<section>
					<h2 className='mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground'>
						Passed ({passed.length})
					</h2>
					<ul className='space-y-3'>
						{passed.map((item) => (
							<DeadlineRow
								key={item.event.id}
								item={item}
								isCoordinator={isCoordinator}
								onDelete={handleDelete}
							/>
						))}
					</ul>
				</section>
			)}
		</div>
	);
}

function DeadlineRow({
	item,
	isCoordinator,
	onDelete,
}: {
	item: { event: Deadlines; dates: Date[]; status: DeadlineStatus };
	isCoordinator: boolean;
	onDelete: (id: string, name: string) => void;
}) {
	const style = statusStyles[item.status];
	const due = item.dates[item.dates.length - 1];

	return (
		<li>
			<Card className='gap-0 py-0 shadow-none'>
				<CardContent className='flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between'>
					<div className='flex min-w-0 items-start gap-4'>
						<div className='hidden w-16 shrink-0 text-center sm:block'>
							<p className='text-xs font-medium uppercase text-muted-foreground'>
								{format(due, 'MMM')}
							</p>
							<p className='text-2xl font-bold leading-none text-primary'>
								{format(due, 'd')}
							</p>
							<p className='mt-0.5 text-xs text-muted-foreground'>
								{format(due, 'yyyy')}
							</p>
						</div>
						<div className='min-w-0'>
							<p className='font-semibold leading-snug'>{item.event.name}</p>
							<p className='mt-1 text-sm text-muted-foreground'>
								{formatDateRange(item.dates)}
							</p>
							<p className='mt-0.5 text-sm text-foreground/80'>
								{relativeLabel(item.dates, item.status)}
							</p>
						</div>
					</div>
					<div className='flex items-center gap-2 sm:shrink-0'>
						<span
							className={cn(
								'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium',
								style.className
							)}
						>
							{style.label}
						</span>
						{isCoordinator && (
							<Button
								type='button'
								variant='ghost'
								size='icon'
								className='text-destructive hover:bg-destructive/10 hover:text-destructive'
								aria-label={`Delete ${item.event.name}`}
								onClick={() => onDelete(item.event.id, item.event.name)}
							>
								<Trash2 className='size-4' />
							</Button>
						)}
					</div>
				</CardContent>
			</Card>
		</li>
	);
}
