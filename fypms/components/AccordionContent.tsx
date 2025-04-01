'use client';

import { Printer } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

export default function AccordionAllocation({ groups, groupNames }) {
	const contentRef = useRef<HTMLDivElement>(null);
	const reactToPrintFn = useReactToPrint({ contentRef });

	const [showCGPA, setShowCGPA] = useState(false);
	return (
		<div className='border rounded-2xl grid divide-y-2 mt-5' ref={contentRef}>
			<div className='flex items-center justify-center p-5 gap-6'>
				<div className=' flex items-center gap-3'>
					<Switch checked={showCGPA} onCheckedChange={(e) => setShowCGPA(e)} />
					<span>Show CGPA</span>
				</div>
				<Button onClick={() => reactToPrintFn()}>
					<Printer />
					Print
				</Button>
			</div>
			{Object.keys(groups).map((key) => (
				<div
					key={key}
					className='p-4 m-2 grid grid-cols-2 items-center justify-between'
				>
					<div>
						<h2 className='text-lg font-medium p-2 border rounded-full w-fit px-9 bg-neutral-50 select-none '>
							{groupNames[key] || 'Loading...'}
						</h2>
					</div>
					<div className='grid'>
						{groups[key].map((student) => (
							<div
								key={student.id}
								className='grid grid-cols-2 gap-1 divide-y py-1 select-none'
							>
								<h2>
									{student.firstName} {student.lastName}
								</h2>
								<p>{showCGPA && student.CGPA}</p>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
