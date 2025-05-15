'use client';
import React, { use, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '../ui/button';
import { useEdgeStore } from '@/lib/edgestore';
import { createTitle, updateProject, uploadChapter } from '@/lib/auth';
import { Student } from '../student-columns';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Project } from '@prisma/client';
import { useBearStore } from '@/lib/store';
import Loader from '../Loader';

export default function UploadChapter({ project }: { project: Project }) {
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

			await uploadChapter(project.id, { chapterLink: res.url });

			toast.success('Chapter uploaded successfully');
			router.refresh();
		} else {
			toast.error('Please upload a file');
		}
		setLoading(false);
	};
	return (
		<form onSubmit={handleSubmit} className='flex gap-2'>
			{loading && <Loader />}
			<Label>Upload chapter:</Label>
			<div className='flex gap-2'>
				<Input
					id='file'
					type='file'
					onChange={(e) => setFile(e.target.files?.[0])}
				/>
				<Button>Submit</Button>
			</div>
		</form>
	);
}
