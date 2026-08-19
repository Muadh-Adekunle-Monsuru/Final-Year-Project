'use client';
import { createEvent } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function CalendarForm() {
	const router = useRouter();
	const [date, setDate] = useState<Date[] | undefined>();
	const [event, setEvent] = useState('');
	const [saving, setSaving] = useState(false);

	const handleCreate = async () => {
		if (!date?.length || !event.trim()) {
			toast.error('Add a milestone name and at least one date.');
			return;
		}
		setSaving(true);
		try {
			await createEvent({ name: event.trim(), date: JSON.stringify(date) });
			toast.success('Deadline added.');
			setDate([]);
			setEvent('');
			router.refresh();
		} finally {
			setSaving(false);
		}
	};

	return (
		<Card className='w-full max-w-sm shrink-0 gap-0 py-0 shadow-none'>
			<CardContent className='flex flex-col gap-4 px-5 py-5'>
				<div>
					<p className='font-semibold'>Add a deadline</p>
					<p className='mt-1 text-sm text-muted-foreground'>
						Name the milestone, then pick a due date. Select more than one date
						for a submission window.
					</p>
				</div>
				<div className='space-y-2'>
					<Label htmlFor='event'>Milestone name</Label>
					<Input
						id='event'
						value={event}
						onChange={(e) => setEvent(e.target.value)}
						placeholder='e.g. Chapter 1 submission'
					/>
				</div>
				<div className='flex flex-col items-center'>
					<Calendar
						mode='multiple'
						selected={date}
						onSelect={setDate}
						initialFocus
					/>
				</div>
				{date && date.length > 0 && (
					<p className='text-xs text-muted-foreground'>
						{date.length === 1
							? `Due ${date[0].toDateString()}`
							: `${date.length} dates selected`}
					</p>
				)}
				<Button onClick={handleCreate} disabled={saving}>
					{saving ? 'Saving…' : 'Add deadline'}
				</Button>
			</CardContent>
		</Card>
	);
}
