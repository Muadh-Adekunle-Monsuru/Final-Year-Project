'use client';
import Loader from '@/components/Loader';
import { approveChapter, UploadPastQuestions } from '@/lib/auth';
import { Project } from '@prisma/client';
import { CircleCheck, MoveUpRight } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
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
		<div>
			{approving && <Loader />}
			{chapterNumber === 0 ? (
				'Abstract'
			) : (
				<h1 className='font-medium mb-1'>Chapter {chapterNumber}: </h1>
			)}
			<div>
				{project.chapters.map((chapter, index) => {
					if (chapter.chapterNumber == chapterNumber) {
						return (
							<div key={index} className='flex gap-3 items-center mb-1'>
								<span className='font-light'>Uploaded on:</span>
								<a
									href={chapter.chapterLink}
									target='_blank'
									rel='noopener noreferrer'
									className='underline flex gap-2 items-center justify-between bg-white hover:font-medium'
								>
									{chapter?.uploadDate?.toLocaleString()}
									<MoveUpRight className='size-4' />
								</a>
								<span
									onClick={() => {
										approveChapterLocal(chapter.chapterId, chapter.chapterLink);
									}}
								>
									<CircleCheck
										className={`size-5 cursor-pointer rounded-full ${
											chapter.approved ? 'bg-green-200' : 'bg-red-200'
										}`}
									/>
								</span>
							</div>
						);
					}
				})}
			</div>
		</div>
	);
}
