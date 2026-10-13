import { getName, getTitle } from '@/lib/auth';
import CollapsibleStudentSide from '../CollapsableStudentSide';
import { Student } from '../student-columns';
import ProjectChapters from './ProjectChapters';
import ProjectTitleDashboard from './ProjectTitleDashboard';
import { Card, CardContent } from '@/components/ui/card';

export default async function StudentDashboard({
	student,
}: {
	student: Student;
}) {
	const name = student.supervisor ? await getName(student.supervisor) : null;
	const project = await getTitle({ studentId: student.id });

	return (
		<div className='space-y-5'>
			<Card className='gap-0 py-0 shadow-none'>
				<CardContent className='px-5 py-4'>
					<p className='text-sm text-muted-foreground'>Supervisor</p>
					<p className='font-semibold'>
						{name
							? `${name.firstName} ${name.lastName}`
							: 'Yet to be assigned'}
					</p>
				</CardContent>
			</Card>
			<ProjectTitleDashboard project={project} student={student} />
			{project?.title?.approvedBySupervisor && (
				<ProjectChapters project={project} />
			)}
			{project?.studentId && (
				<CollapsibleStudentSide
					studentId={project?.studentId}
					supervisorId={project?.supervisorId}
				/>
			)}
		</div>
	);
}
