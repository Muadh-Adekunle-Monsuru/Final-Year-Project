import { getName, getTitle } from '@/lib/auth';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import BackButton from './BackButton';
import ShowStudentsChapters from './ShowStudentsChapter';
import SupervisorStudentPageCard from './SupervisorStudentPageCard';

export default async function SupervisorStudentPage({
	params,
}: {
	params: { id: string };
}) {
	const { id } = params;

	const studentName = await getName(id);
	const project = await getTitle({ studentId: id });
	return (
		<div className='p-5'>
			<BackButton />
			<p className='font-medium text-sm'>Student:</p>
			<p className='text-lg mb-2'>
				{studentName.firstName} {studentName.lastName}
			</p>
			<div>
				<p className='font-medium text-sm'>Title:</p>
				<p className='text-lg mb-2'>{project.title.title}</p>
				<p className='font-medium text-sm'>Project Description: </p>
				<p className='max-w-3xl text-justify text-lg mb-2'>
					{project?.title?.titleDescription}
				</p>
				{project?.title?.proposalDocLink && (
					<Link
						href={project?.title?.proposalDocLink}
						target='_blank'
						className='hover:text-blue-700 flex items-center gap-1 mt-2'
					>
						<span className='underline'>View Document:</span>
						<ExternalLink className='size-4' />
					</Link>
				)}
				<SupervisorStudentPageCard project={project} />

				{project?.chapters.length > 0 && (
					<ShowStudentsChapters project={project} />
				)}
			</div>
		</div>
	);
}
