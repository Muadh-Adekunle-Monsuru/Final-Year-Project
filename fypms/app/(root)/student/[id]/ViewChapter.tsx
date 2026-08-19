'use client';
import Loader from '@/components/Loader';
import { approveChapter, UploadPastQuestions } from '@/lib/auth';
import { Project } from '@prisma/client';
import { CircleCheck, MoveUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ViewChapter({
	project,
	chapterNumber,
	studentName,
	supervisorName,
}: {
	project: Project;
	chapterNumber: number;
	studentName?: string;
	supervisorName?: string;
}) {
	const router = useRouter();
	const [approving, setApproving] = useState(false);
	const approveChapterLocal = async (chapterId, chapterLink) => {
		setApproving(true);
		await approveChapter(project.id, chapterId);
		setApproving(false);
		router.refresh();
		toast.success('Chapter approval changed');

		if (chapterNumber === 0) {
			await addToPastProjects(chapterId, chapterLink);
			toast.success('Abstract added to past projects');
		}
	};

	const addToPastProjects = async (chapterId, chapterLink) => {
		await UploadPastQuestions({
			values: {
				year: new Date().getFullYear().toString(),
				authors: [studentName],
				projectDescription: project.title.titleDescription,
				projectLink: chapterLink,
				serialNumber: '-',
				supervisorNames: supervisorName,
				title: project.title.title,
			},
		});
	};
	return (
		<div className='py-3'>
			{approving && <Loader />}
			<h3 className='mb-2 text-sm font-semibold'>
				{chapterNumber === 0 ? 'Abstract' : `Chapter ${chapterNumber}`}
			</h3>
			<div>
				{project.chapters.map((chapter, index) => {
					if (chapter.chapterNumber == chapterNumber) {
						return (
							<div
								key={index}
								className='mb-1 flex flex-wrap items-center gap-3 text-sm'
							>
								<span className='text-muted-foreground'>Uploaded</span>
								<a
									href={chapter.chapterLink}
									target='_blank'
									rel='noopener noreferrer'
									className='inline-flex items-center gap-1 font-medium text-primary hover:underline'
								>
									{chapter?.uploadDate?.toLocaleString()}
									<MoveUpRight className='size-4' />
								</a>
								<button
									type='button'
									aria-label={
										chapter.approved ? 'Unapprove chapter' : 'Approve chapter'
									}
									onClick={() => {
										approveChapterLocal(chapter.chapterId, chapter.chapterLink);
									}}
								>
									<CircleCheck
										className={`size-5 cursor-pointer rounded-full ${
											chapter.approved
												? 'bg-brand-muted text-primary'
												: 'bg-muted text-muted-foreground'
										}`}
									/>
								</button>
							</div>
						);
					}
				})}
			</div>
		</div>
	);
}
