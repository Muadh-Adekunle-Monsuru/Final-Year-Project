'use client';
import { createEvent } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Input } from './ui/input';
import { Label } from './ui/label';
export default function CalendarForm() {
	const router = useRouter();
	const [date, setDate] = useState<Date[] | undefined>();
	const [event, setEvent] = useState('');

	const handleCreate = async () => {
		if (!date || !event) {
			return;
		}
		await createEvent({ name: event, date: JSON.stringify(date) });
		toast('Event created ✨');
		setDate([]);
		setEvent('');
		router.refresh();
	};
	return (
		<div>
			<div className='p-3 border rounded-2xl max-w-sm flex flex-col items-center justify-center gap-2'>
				<div>
					<Label htmlFor='event' className='py-2'>
						Event Name
					</Label>
					<Input
						id='event'
						value={event}
						onChange={(e) => setEvent(e.target.value)}
						placeholder='Submission of progress report'
					/>
				</div>
				<Calendar
					mode='multiple'
					selected={date}
					onSelect={setDate}
					initialFocus
				/>
				{date &&
					date.map((date, index) => (
						<span key={index}>{date.toDateString()}</span>
					))}
				<Button onClick={handleCreate}>Create Event</Button>
			</div>
		</div>
	);
}
