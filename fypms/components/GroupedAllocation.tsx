'use client';
import { getSupervisorName } from '@/lib/auth';
import { User } from '@prisma/client';
import React, { useState, useEffect, useRef } from 'react';
import { createSwapy } from 'swapy';

export default function GroupedAllocation({ groups }) {
	const swapy = useRef(null);
	const container = useRef(null);
	const [groupNames, setGroupNames] = useState({});

	useEffect(() => {
		const fetchNames = async () => {
			const names = {};
			for (const key of Object.keys(groups)) {
				const name = await getSupervisorName(key);
				if (name) {
					names[key] = `${name.firstName} ${name.lastName}`;
				}
			}
			setGroupNames(names);
		};

		fetchNames();
	}, [groups]);

	useEffect(() => {
		if (container.current) {
			swapy.current = createSwapy(container.current);

			swapy.current.onSwap((event) => {
				console.log('swap', event);
			});
		}

		return () => {
			swapy.current?.destroy();
		};
	}, [groupNames]);

	return (
		<div className='border rounded-2xl grid divide-y-2' ref={container}>
			{Object.keys(groups).map((key) => (
				<div
					key={key}
					className='p-4 m-2 grid grid-cols-2 items-center justify-between'
				>
					<div data-swapy-item={key}>
						<h2
							className='text-lg font-medium p-2 border rounded-full w-fit px-9 bg-neutral-50 select-none cursor-pointer hover:shadow'
							data-swapy-slot={key}
						>
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
								<p>{student.CGPA}</p>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
