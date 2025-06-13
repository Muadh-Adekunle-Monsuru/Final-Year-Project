'use client';
import { uploadChapter } from '@/lib/auth';
import { useEdgeStore } from '@/lib/edgestore';
import { Project } from '@prisma/client';
import { ArrowUpToLine, CircleCheck, MoveUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
import Loader from '../Loader';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { nanoid } from 'nanoid';

export default function UploadChapter({
	project,
	chapterNumber,
}: {
	project: Project;
	chapterNumber: number;
}) {
	const router = useRouter();
	const [file, setFile] = React.useState<File>();
	const [loading, setLoading] = useState(false);
	const { edgestore } = useEdgeStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (file) {
			const res = await edgestore.publicFiles.upload({
				file,
				onProgressChange: () => {
					// you can use this to show a progress bar
				},
			});
			const chapterId = nanoid();
			await uploadChapter(project.id, {
				chapterLink: res.url,
				chapterNumber,
				chapterId,
			});

			toast.success('Chapter uploaded successfully');
			setFile(undefined);
			router.refresh();
		} else {
			toast.error('Please upload a file');
		}
		setLoading(false);
	};
	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-2 py-4'>
			{loading && <Loader />}
			<h1 className='font-medium'>Chapter {chapterNumber}</h1>
			<div>
				{project.chapters.map((chapter, index) => {
					if (chapter.chapterNumber == chapterNumber) {
						return (
							<div key={index} className='flex gap-3 items-center'>
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
								<CircleCheck
									className={`size-5 rounded-full ${
										chapter.approved ? 'bg-green-200' : 'bg-red-200'
									}`}
								/>
							</div>
						);
					}
				})}
			</div>
			<div className='flex gap-2'>
				<Input
					id='file'
					type='file'
					onChange={(e) => setFile(e.target.files?.[0])}
				/>
				<Button>
					<ArrowUpToLine className='size-4 ' />
				</Button>
			</div>
		</form>
	);
}
