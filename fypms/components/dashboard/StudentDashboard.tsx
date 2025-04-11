import { getSupervisorName, getTitle } from '@/lib/auth';
import { Student } from '../student-columns';
import ProjectTitleForm from './ProjectTitleForm';
import ProjectTitleCard from './ProjectTitleCard';

export default async function StudentDashboard({
	student,
}: {
	student: Student;
}) {
	const name = await getSupervisorName(student.supervisor);
	const project = await getTitle({ studentId: student.id });
	return (
		<div>
			<div>
				<div>
					Supervisor:{' '}
					{student.supervisor
						? `${name.firstName} ${name.lastName}`
						: 'yet to be assigned'}
				</div>
				{project?.studentId ? (
					<ProjectTitleCard project={project} />
				) : (
					<ProjectTitleForm student={student} />
				)}
			</div>
		</div>
	);
}
