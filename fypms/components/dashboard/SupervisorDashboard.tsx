'use client';
import React, { useEffect, useState } from 'react';
import { Supervisor } from '../supervisor-columns';
import { getName, getTitle } from '@/lib/auth';
import SuperviseeStudentCard from './SuperviseeStudentCard';
import Loader from '../Loader';
import { Card, CardContent } from '@/components/ui/card';

export default function SupervisorDashboard({
	supervisor,
}: {
	supervisor: Supervisor;
}) {
	const [supeverisees, setSupervisees] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetch = async () => {
			setIsLoading(true);
			const studentName = {};
			for (const student of supervisor.supervisees) {
				const name = await getName(student);
				const title = await getTitle({ studentId: student });
				if (name) {
					studentName[student] = {
						name: `${name.firstName} ${name.lastName}`,
						matric: `${name.name}`,
						id: student,
					};
				}
				if (title) {
					studentName[student].project = title;
				}
			}
			setSupervisees(studentName);
			setIsLoading(false);
		};
		fetch();
	}, [supervisor]);

	if (isLoading) {
		return (
			<div>
				<Loader />
			</div>
		);
	}

	return (
		<div className='space-y-5'>
			<Card className='gap-0 py-0 shadow-none'>
				<CardContent className='px-5 py-4'>
					<p className='text-sm text-muted-foreground'>Supervisees</p>
					<p className='text-lg font-semibold'>
						{supervisor.supervisees.length}{' '}
						{supervisor.supervisees.length === 1 ? 'student' : 'students'}
					</p>
				</CardContent>
			</Card>
			{supervisor.supervisees.length === 0 ? (
				<p className='text-sm text-muted-foreground'>
					No students have been assigned yet.
				</p>
			) : (
				<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
					{supervisor.supervisees.map((student, index) => (
						<SuperviseeStudentCard student={supeverisees[student]} key={index} />
					))}
				</div>
			)}
		</div>
	);
}
