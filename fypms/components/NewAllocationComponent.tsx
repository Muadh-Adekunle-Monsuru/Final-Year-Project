'use client';
import { allocateSupervisors } from '@/lib/auth';
import { Loader } from 'lucide-react';
import React from 'react';
import GroupedAllocation from './GroupedAllocation';
import { Button } from './ui/button';

export default function NewAllocationComponent() {
	const [students, setStudents] = React.useState({});
	const [generating, setGenerating] = React.useState(false);

	const handleClick = async () => {
		setGenerating(true);
		const res = await allocateSupervisors();
		setStudents(res);
		setGenerating(false);
	};
	return (
		<div>
			<div className='flex items-center gap-6 p-3 justify-between border rounded-2xl'>
				<Button onClick={handleClick}>Allocate Supervisors</Button>
			</div>
			{generating && (
				<div className='flex flex-col items-center mx-auto justify-center gap-6 p-3  border rounded-2xl h-60 mt-5 bg-slate-50'>
					<Loader className='animate-spin' />
					<p className='text-lg animate-pulse'>Allocating...</p>
				</div>
			)}
			<div>
				{Object.keys(students).length > 0 && (
					<GroupedAllocation groups={students} />
				)}
			</div>
		</div>
	);
}
