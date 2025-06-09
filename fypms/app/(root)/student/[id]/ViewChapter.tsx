'use client';
import Loader from '@/components/Loader';
import { approveChapter } from '@/lib/auth';
import { Project } from '@prisma/client';
import { CircleCheck, MoveUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

export default function ViewChapter({
	project,
	chapterNumber,
}: {
	project: Project;
	chapterNumber: number;
}) {
	const router = useRouter();
	const [approving, setApproving] = useState(false);
	const approveChapterLocal = async (chapterId) => {
		setApproving(true);
		await approveChapter(project.id, chapterId);
		setApproving(false);
		router.refresh();
		toast.success('Chapter approval changed');
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
										approveChapterLocal(chapter.chapterId);
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
