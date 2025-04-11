'use client';
import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '../ui/button';
import { useEdgeStore } from '@/lib/edgestore';
import { createTitle } from '@/lib/auth';
import { Student } from '../student-columns';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
export default function ProjectTitleForm({ student }: { student: Student }) {
	const router = useRouter();
	const [file, setFile] = React.useState<File>();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const { edgestore } = useEdgeStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (file) {
			const res = await edgestore.publicFiles.upload({
				file,
				onProgressChange: (progress) => {
					// you can use this to show a progress bar
				},
			});
			console.log(res.url);
			await createTitle({
				title,
				description,
				link: res.url,
				studentId: student.id,
				supervisorId: student.supervisor,
			});
			toast.success('Project title created successfully!');
			router.refresh();
		}
	};
	return (
		<form
			className='p-5 border rounded-3xl grid space-y-1 mt-4'
			onSubmit={handleSubmit}
		>
			<Label>Title:</Label>
			<Input
				placeholder='Design and Implementation of a digital ...'
				className=''
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<Label>Description:</Label>
			<Textarea
				placeholder='Short description of the project'
				className='w-full'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			{/* <div>{JSON.stringify(res)}</div> */}
			<Label>Upload proposal:</Label>
			<Input
				id='file'
				type='file'
				onChange={(e) => setFile(e.target.files?.[0])}
			/>

			<Button>Submit</Button>
		</form>
	);
}
