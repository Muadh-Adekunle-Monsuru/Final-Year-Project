import React from 'react';
import UploadChapter from './UploadChapter';
import { Project } from '@prisma/client';
import { getChapters } from '@/lib/auth';
import { MoveUpIcon, MoveUpRight } from 'lucide-react';

export default async function ProjectChapters({
	project,
	studentId,
}: {
	project: Project;
	studentId: string;
}) {
	const chapters = await getChapters({ studentId });
	return (
		<div className='relative p-5 border rounded-3xl grid space-y-1 mt-4'>
			<h2 className='text-lg font-medium'>Chapters</h2>
			<div className='grid grid-cols-1 gap-4'>
				{chapters.map((chapter, index) => (
					<a
						href={chapter.chapterLink}
						target='_blank'
						rel='noopener noreferrer'
						key={index}
						className='p-4 border rounded-lg hover:shadow-sm flex items-center justify-between bg-white hover:bg-gray-50'
					>
						{chapter.chapterName}
						<MoveUpRight className='size-5' />
					</a>
				))}
			</div>
			<UploadChapter project={project} />
		</div>
	);
}
