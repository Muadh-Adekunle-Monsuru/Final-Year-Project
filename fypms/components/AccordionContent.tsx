'use client';
import { getSupervisorName, saveAllocation } from '@/lib/auth';
import { User } from '@prisma/client';
import React, { useState, useEffect, useRef } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function AccordionAllocation({ groups, groupNames }) {
	// const [groupNames, setGroupNames] = useState({});
	const [allocationName, setAllocationName] = useState('');
	// useEffect(() => {
	// 	const fetchNames = async () => {
	// 		const names = {};
	// 		for (const key of Object.keys(groups)) {
	// 			const name = await getSupervisorName(key);
	// 			if (name) {
	// 				names[key] = `${name.firstName} ${name.lastName}`;
	// 			}
	// 		}
	// 		setGroupNames(names);
	// 		// console.log(names);
	// 	};

	// 	fetchNames();
	// }, [groups]);

	// const saveAllocationToDatabase = async () => {
	// 	const res = await saveAllocation({
	// 		allocationName,
	// 		groups: JSON.stringify(groups),
	// 		supervisorNames: JSON.stringify(groupNames),
	// 	});
	// 	setAllocationName('');
	// };

	return (
		<div className='border rounded-2xl grid divide-y-2 mt-5'>
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
