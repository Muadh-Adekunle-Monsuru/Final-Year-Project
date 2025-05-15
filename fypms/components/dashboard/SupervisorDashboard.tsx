'use client';
import React, { useEffect, useState } from 'react';
import { Supervisor } from '../supervisor-columns';
import { getName, getTitle } from '@/lib/auth';
import SuperviseeStudentCard from './SuperviseeStudentCard';

export default function SupervisorDashboard({
	supervisor,
}: {
	supervisor: Supervisor;
}) {
	const [supeverisees, setSupervisees] = useState({});

	useEffect(() => {
		const fetch = async () => {
			const studentName = {};
			for (const student of supervisor.supervisees) {
				const name = await getName(student);
				const title = await getTitle({ studentId: student });
				if (name) {
					studentName[student] = {
						name: `${name.firstName} ${name.lastName}`,
						matric: `${name.name}`,
					};
				}
				if (title) {
					studentName[student].project = title;
				}
			}
			setSupervisees(studentName);
		};
		fetch();
	}, [supervisor]);
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
