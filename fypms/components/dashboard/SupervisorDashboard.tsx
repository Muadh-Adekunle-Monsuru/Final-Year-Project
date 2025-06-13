'use client';
import React, { useEffect, useState } from 'react';
import { Supervisor } from '../supervisor-columns';
import { getName, getTitle } from '@/lib/auth';
import SuperviseeStudentCard from './SuperviseeStudentCard';
import Loader from '../Loader';

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
		<div>
			<div>
				<p>Number of supervisees: {supervisor.supervisees.length}</p>
			</div>
			{supervisor.supervisees.map((student, index) => (
				<SuperviseeStudentCard student={supeverisees[student]} key={index} />
			))}
		</div>
	);
}
