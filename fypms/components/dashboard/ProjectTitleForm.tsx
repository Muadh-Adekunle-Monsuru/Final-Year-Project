'use client';
import { Textarea } from '@/components/ui/textarea';
import { createTitle, updateProject } from '@/lib/auth';
import { useEdgeStore } from '@/lib/edgestore';
import { useBearStore } from '@/lib/store';
import { Project } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
import Loader from '../Loader';
import { Student } from '../student-columns';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function ProjectTitleForm({
	student,
	project,
}: {
	student: Student;
	project: Project;
}) {
	const router = useRouter();
	const [file, setFile] = React.useState<File>();
	const [title, setTitle] = useState(project?.title?.title);
	const [description, setDescription] = useState(
		project?.title?.titleDescription
	);
	const [loading, setLoading] = useState(false);
	const { edgestore } = useEdgeStore();
	const setEditable = useBearStore((state) => state.setEditable);

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
			if (project?.id) {
				await updateProject(project.id, {
					title,
					titleDescription: description,
					proposalDocLink: res.url,
				});
				toast.success('Project title updated successfully!');
				router.refresh();
				setEditable();
			} else {
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
		} else {
			toast.error('Please upload a file');
		}
		setLoading(false);
	};
	return (
		<form
			className='p-5 border rounded-3xl grid space-y-1 mt-4'
			onSubmit={handleSubmit}
		>
			{loading && <Loader />}
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
