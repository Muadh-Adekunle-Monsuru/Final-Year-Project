'use client';
import { Project } from '@prisma/client';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { Switch } from '../ui/switch';
import { supervisorApproval, supervisorComment } from '@/lib/auth';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

export default function SuperviseeStudentCard({
	student,
}: {
	student: {
		id: string;
		name: string;
		matric: string;
		project?: Project;
	};
}) {
	const router = useRouter();
	const [approving, setApproving] = useState(false);
	const [comment, setComment] = useState('');

	const toggleApproval = async (value: boolean) => {
		setApproving(true);
		console.log('toggled, ', value, student.project.id);
		await supervisorApproval(student.project.id, value);
		router.refresh();
		setApproving(false);
	};

	const submitSupervisorComment = async () => {
		await supervisorComment(student.project.id, comment);
		router.refresh();
	};
	return (
		<div className='rounded-2xl border p-3 my-4 hover:bg-neutral-50 transition-colors '>
			<h2 className='text-lg font-medium'>{student?.name}</h2>
			<h3 className='text-sm text-primary'>{student?.matric}</h3>
			{student?.project?.id && (
				<div>
					<p className='font-medium pt-3'>Project Title: </p>
					<p className=' font-light'>{student?.project?.title?.title}</p>
					<p className='font-medium pt-3'>Project Description: </p>
					<p className='max-w-3xl text-justify font-light'>
						{student?.project?.title?.titleDescription}
					</p>
					{student?.project?.title?.proposalDocLink && (
						<Link
							href={student?.project?.title?.proposalDocLink}
							target='_blank'
							className='hover:text-blue-700 flex items-center gap-1 mt-2'
						>
							<span className=''>View Document:</span>
							<ExternalLink className='size-4' />
						</Link>
					)}
					<div className='flex items-center mt-3 gap-5'>
						<p className='font-medium'>Supervisor Approval: </p>
						<Button
							variant='outline'
							size='sm'
							onClick={() => {
								toggleApproval(!student?.project?.title.approvedBySupervisor);
							}}
							disabled={approving}
							className={`${
								student?.project?.title.approvedBySupervisor
									? 'bg-red-100 '
									: 'bg-green-100'
							}`}
						>
							{student?.project?.title.approvedBySupervisor
								? 'Click to Unapprove'
								: 'Click to Approve'}
						</Button>
					</div>

					<div className='flex flex-col '>
						<p className='font-medium'>Supervisor Comment: </p>
						{student?.project?.title.supervisorComments ? (
							<p className='font-light'>
								{student?.project?.title.supervisorComments}
							</p>
						) : (
							<div>
								<Textarea
									placeholder='Write a comment here...'
									className='max-w-3xl'
									value={comment}
									onChange={(e) => setComment(e.target.value)}
								/>
								<Button
									size='sm'
									className='w-fit mt-2'
									onClick={() => submitSupervisorComment()}
								>
									Submit Comment
								</Button>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
