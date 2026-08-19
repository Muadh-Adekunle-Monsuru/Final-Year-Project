import { Card, CardContent } from '@/components/ui/card';
import { Project } from '@prisma/client';
import ViewChapter from './ViewChapter';

export default function ShowStudentsChapters({
	project,
	studentName,
	supervisorName,
}: {
	project: Project;
	studentName: string;
	supervisorName: string;
}) {
	return (
		<Card className='gap-0 py-0 shadow-none'>
			<CardContent className='px-5 py-5'>
				<h2 className='text-base font-semibold'>Chapters</h2>
				<p className='mb-4 text-sm text-muted-foreground'>
					Open a file to review it. Use the checkmark to approve or unapprove.
				</p>
				<div className='divide-y divide-border'>
					<ViewChapter project={project} chapterNumber={1} />
					<ViewChapter project={project} chapterNumber={2} />
					<ViewChapter project={project} chapterNumber={3} />
					<ViewChapter project={project} chapterNumber={4} />
					<ViewChapter project={project} chapterNumber={5} />
					<ViewChapter
						project={project}
						chapterNumber={0}
						studentName={studentName}
						supervisorName={supervisorName}
					/>
				</div>
			</CardContent>
		</Card>
	);
}
