'use client';
import { Project } from '@prisma/client';
import Link from 'next/link';

export default function SuperviseeStudentCard({
	student,
}: {
	student: {
		id: string;
		name: string;
		matric: string;
		project?: Project;
	};
}) {
	return (
		<div className='rounded-2xl border p-3 my-4 hover:bg-neutral-50/50 transition-colors '>
			<h2 className='text-lg font-medium'>{student?.name}</h2>
			<h3 className='text-sm text-primary'>{student?.matric}</h3>
			{student?.project?.id && (
				<div className='w-full'>
					<>
						<p className='font-medium pt-3'>Project Title: </p>
						<p className=' font-light'>{student?.project?.title?.title}</p>
					</>

					<Link href={`/student/${student.id}`} className='text-xs underline'>
						View Project Details
					</Link>
				</div>
			)}
		</div>
	);
}
