import { getChapters } from '@/lib/auth';
import { Project } from '@prisma/client';
import AbstractUpload from './AbstractUpload';
import UploadChapter from './UploadChapter';

export default async function ProjectChapters({
	project,
	studentId,
}: {
	project: Project;
	studentId: string;
}) {
	// const chapters = await getChapters({ studentId });
	return (
		<div className='relative p-5 border rounded-3xl grid space-y-1 mt-4'>
			<h2 className='text-xl font-medium'>Chapters</h2>
			<div className='grid divide-y divide-gray-200'>
				<UploadChapter project={project} chapterNumber={1} />
				<UploadChapter project={project} chapterNumber={2} />
				<UploadChapter project={project} chapterNumber={3} />
				<UploadChapter project={project} chapterNumber={4} />
				<UploadChapter project={project} chapterNumber={5} />
				<AbstractUpload project={project} chapterNumber={0} />
			</div>
		</div>
	);
}
