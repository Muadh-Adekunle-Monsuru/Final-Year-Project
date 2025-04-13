import { Project } from '@prisma/client';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function SuperviseeStudentCard({
	student,
}: {
	student: {
		name: string;
		matric: string;
		project?: Project;
	};
}) {
	return (
		<div className='rounded-2xl border p-3 my-2 hover:bg-neutral-100 transition-colors '>
			<h2 className='text-lg font-medium'>{student?.name}</h2>
			<h3 className='text-sm text-primary'>{student?.matric}</h3>
			{student?.project?.id && (
				<div>
					<p className='font-medium pt-3'>Project Title: </p>
					<p className=' font-light'>{student?.project?.title?.title}</p>
					<p className='font-medium pt-3'>Project Description: </p>
					<p className='max-w-xl text-justify font-light'>
						{student?.project?.title?.titleDescription}
					</p>
					<p className='font-medium mt-2 text-lg'>Supervisor Approval: </p>
					<p>
						{student?.project.title?.approvedBySupervisor == null
							? 'Pending'
							: student?.project.title?.approvedBySupervisor
							? 'Yes'
							: 'No'}
					</p>
					{student?.project?.title?.proposalDocLink && (
						<Link
							href={student?.project?.title?.proposalDocLink}
							target='_blank'
							className='hover:text-blue-700 flex items-center gap-1 mt-2'
						>
							<span className=''>View Document:</span>
							<ExternalLink className='size-4' />
						</Link>
					)}
				</div>
			)}
		</div>
	);
}
