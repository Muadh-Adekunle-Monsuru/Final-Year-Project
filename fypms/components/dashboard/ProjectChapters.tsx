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
			<UploadChapter project={project} chapterNumber={1} />
			<UploadChapter project={project} chapterNumber={2} />
			<UploadChapter project={project} chapterNumber={3} />
			<UploadChapter project={project} chapterNumber={4} />
			<UploadChapter project={project} chapterNumber={5} />
		</div>
	);
}
