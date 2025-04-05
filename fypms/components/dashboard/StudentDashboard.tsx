import { User } from '@prisma/client';
import React from 'react';
import { Student } from '../student-columns';
import { getSupervisorName } from '@/lib/auth';
import ProjectTitle from './ProjectTitle';

export default async function StudentDashboard({
	student,
}: {
	student: Student;
}) {
	const name = await getSupervisorName(student.supervisor);
	return (
		<div>
			<div>
				<div>
					Supervisor:{' '}
					{student.supervisor
						? `${name.firstName} ${name.lastName}`
						: 'yet to be assigned'}
				</div>
				<ProjectTitle />
			</div>
		</div>
	);
}
