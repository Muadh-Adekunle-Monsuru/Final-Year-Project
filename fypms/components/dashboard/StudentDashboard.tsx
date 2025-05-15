import { getName, getTitle } from '@/lib/auth';
import { Student } from '../student-columns';
import ProjectTitleCard from './ProjectTitleCard';
import ProjectTitleForm from './ProjectTitleForm';
import ProjectTitleDashboard from './ProjectTitleDashboard';

export default async function StudentDashboard({
	student,
}: {
	student: Student;
}) {
	const name = await getName(student.supervisor);
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
				<ProjectTitleDashboard project={project} student={student} />
			</div>
		</div>
	);
}
