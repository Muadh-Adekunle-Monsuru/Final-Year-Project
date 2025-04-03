'use client';
import { deleteEvent } from '@/lib/auth';
import { Deadlines } from '@prisma/client';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';
export default function EventList({ events }: { events: Deadlines[] }) {
	const router = useRouter();
	const handleDelete = async (id: string) => {
		await deleteEvent(id);
		router.refresh();
		toast('Event deleted ❌');
	};
	return (
		<div className='border p-5 rounded-2xl w-full max-h-96  overflow-auto'>
			<p className='font-bold'>Created Deadlines</p>
			<div className='grid divide-y-2'>
				{events.map((event) => {
					const dates = JSON.parse(event.date).map((date, index) => (
						<p key={index}>{new Date(date).toDateString()} </p>
					));
					return (
						<div
							className=' grid grid-cols-2 p-3  hover:bg-neutral-50 transition-colors relative group'
							key={event.id}
						>
							<p className='uppercase'>{event.name}</p>
							<div className='text-xs text-neutral-600 col-end-1'>
								<span>
									{new Date(JSON.parse(event.date)[0]).toDateString()}
								</span>
								{JSON.parse(event.date).length > 1 && (
									<span>
										{' '}
										- {new Date(JSON.parse(event.date).at(-1)).toDateString()}
									</span>
								)}
							</div>
							<Trash2
								className='absolute -right-5 top-4 size-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer hover:text-neutral-600'
								onClick={() => {
									handleDelete(event.id);
								}}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}
