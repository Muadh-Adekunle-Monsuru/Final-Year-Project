import { allocateSupervisors } from '@/lib/auth';
import React from 'react';

export default async function Allocation() {
	const students = await allocateSupervisors();
	return (
		<div>
			{students.map((student) => (
				<div key={student.id}>
					<h1>{student.name}</h1>
					<p>{student.CGPA}</p>
					<p>{student.supervisor}</p>
				</div>
			))}
		</div>
	);
}
