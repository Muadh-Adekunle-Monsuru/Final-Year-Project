import { Project } from '@prisma/client';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function ProjectTitleCard({ project }: { project: Project }) {
	return (
		<div className='p-5 border rounded-3xl grid space-y-1 mt-4'>
			<div>
				<div>
					<p className='font-medium text-lg'>Project Title:</p>
					<p>{project.title.title}</p>
					<p className='font-medium mt-2 text-lg'>Project Description:</p>
					<p className='max-w-xl text-justify'>
						{project.title.titleDescription}
					</p>
				</div>
				<div>
					<p className='font-medium mt-2 text-lg'>Supervisor Approval: </p>
					<p>
						{project.title?.approvedBySupervisor == null
							? 'Pending'
							: project.title?.approvedBySupervisor
							? 'Yes'
							: 'No'}
					</p>
				</div>
				<Link
					href={project.title.proposalDocLink}
					target='_blank'
					className='hover:text-blue-700 flex items-center gap-1 mt-2'
				>
					<span className=''>View Document:</span>
					<ExternalLink className='size-4' />
				</Link>
			</div>
		</div>
	);
}
