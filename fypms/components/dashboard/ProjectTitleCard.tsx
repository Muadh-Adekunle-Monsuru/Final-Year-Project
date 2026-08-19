'use client';
import { useBearStore } from '@/lib/store';
import { Project } from '@prisma/client';
import { ExternalLink, PencilIcon } from 'lucide-react';
import Link from 'next/link';

export default function ProjectTitleCard({ project }: { project: Project }) {
	// const [editable, setEditable] = useState(false);
	const setEditable = useBearStore((state) => state.setEditable);
	return (
		<div className='relative mt-0 grid space-y-1 rounded-xl border bg-card p-5 shadow-none'>
			<div className='absolute top-3 right-5'>
				<PencilIcon
					className='size-5 text-gray-400 hover:text-black cursor-pointer'
					onClick={() => setEditable()}
				/>
			</div>
			<div>
				<div>
					<p className='font-medium text-lg'>Project Title:</p>
					<p>{project.title.title}</p>
					<p className='font-medium mt-2 text-lg'>Project Description:</p>
					<p className='max-w-xl text-justify'>
						{project.title.titleDescription}
					</p>
				</div>
				<Link
					href={project.title.proposalDocLink}
					target='_blank'
					className='mt-2 flex items-center gap-1 text-primary hover:underline'
				>
					<span className=''>View Document:</span>
					<ExternalLink className='size-4' />
				</Link>
				<div>
					<p className='font-medium mt-2 text-lg'>Supervisor Approval: </p>
					<div className=''>
						{project.title?.approvedBySupervisor == null ? (
							'Pending'
						) : project.title?.approvedBySupervisor ? (
							<p className='font-medium text-primary'>Yes</p>
						) : (
							<p className='text-red-600'>No</p>
						)}
					</div>
				</div>
				<div>
					<p className='font-medium mt-2 text-lg'>Supervisor Comment: </p>
					<p>{project.title?.supervisorComments || 'No comments'}</p>
				</div>
			</div>
		</div>
	);
}
