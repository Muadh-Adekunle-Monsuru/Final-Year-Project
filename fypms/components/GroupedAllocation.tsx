'use client';
import { getSupervisorName } from '@/lib/auth';
import { User } from '@prisma/client';
import React, { useState, useEffect, useRef } from 'react';

export default function GroupedAllocation({ groups }) {
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

	return (
		<div className='border rounded-2xl grid divide-y-2'>
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
								<p>{student.CGPA}</p>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
