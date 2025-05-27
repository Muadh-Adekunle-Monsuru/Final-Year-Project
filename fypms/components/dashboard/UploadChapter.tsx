'use client';
import { uploadChapter } from '@/lib/auth';
import { useEdgeStore } from '@/lib/edgestore';
import { Project } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
import Loader from '../Loader';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ArrowUpToLine, MoveUpRight } from 'lucide-react';

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
				onProgressChange: (progress) => {
					// you can use this to show a progress bar
				},
			});

			await uploadChapter(project.id, { chapterLink: res.url, chapterNumber });

			toast.success('Chapter uploaded successfully');
			setFile(undefined);
			router.refresh();
		} else {
			toast.error('Please upload a file');
		}
		setLoading(false);
	};
	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-2 my-4'>
			{loading && <Loader />}
			<h1 className='font-bold'>Chapter {chapterNumber}</h1>
			<div>
				{project.chapters.map((chapter, index) => {
					if (chapter.chapterNumber == chapterNumber) {
						return (
							<a
								href={chapter.chapterLink}
								target='_blank'
								rel='noopener noreferrer'
								key={index}
								className='p-4 border rounded-lg hover:shadow-sm flex items-center justify-between bg-white hover:bg-gray-50'
							>
								{chapter.chapterNumber}
								<MoveUpRight className='size-5' />
							</a>
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
