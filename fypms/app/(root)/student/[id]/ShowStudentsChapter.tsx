import { Project } from '@prisma/client';
import React from 'react';
import ViewChapter from './ViewChapter';

export default function ShowStudentsChapters({
	project,
}: {
	project: Project;
}) {
	return (
		<div className=' p-2 border-t-2 grid space-y-1 mt-4'>
			<h2 className='text-xl font-medium'>Chapters</h2>
			<div className='grid divide-y divide-gray-200'>
				<ViewChapter project={project} chapterNumber={1} />
				<ViewChapter project={project} chapterNumber={2} />
				<ViewChapter project={project} chapterNumber={3} />
				<ViewChapter project={project} chapterNumber={4} />
				<ViewChapter project={project} chapterNumber={5} />
				<ViewChapter project={project} chapterNumber={0} />
			</div>
		</div>
	);
}
