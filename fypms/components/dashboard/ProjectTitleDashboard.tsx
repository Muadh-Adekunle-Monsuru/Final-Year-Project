'use client';
import { Project } from '@prisma/client';
import React from 'react';
import { Student } from '../student-columns';
import ProjectTitleCard from './ProjectTitleCard';
import ProjectTitleForm from './ProjectTitleForm';
import { useBearStore } from '@/lib/store';

export default function ProjectTitleDashboard({
	project,
	student,
}: {
	project: Project;
	student: Student;
}) {
	const editable = useBearStore((state) => state.isEditable);
	return (
		<div>
			{project?.studentId && !editable ? (
				<ProjectTitleCard project={project} />
			) : (
				<ProjectTitleForm student={student} project={project} />
			)}
		</div>
	);
}
