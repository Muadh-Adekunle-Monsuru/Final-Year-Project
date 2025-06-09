'use client';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supervisorApproval, supervisorComment } from '@/lib/auth';
import { Project } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function SupervisorStudentPageCard({
	project,
}: {
	project: Project;
}) {
	const router = useRouter();
	const [approving, setApproving] = useState(false);
	const [comment, setComment] = useState('');

	const submitSupervisorComment = async () => {
		setApproving(true);
		await supervisorComment(project.id, comment);
		router.refresh();
		setApproving(false);
	};
	const toggleApproval = async (value: boolean) => {
		setApproving(true);
		await supervisorApproval(project.id, value);
		router.refresh();
		setApproving(false);
	};

	return (
		<div>
			{approving && <Loader />}
			<div className='items-center mt-3 gap-5'>
				<p className='font-medium text-sm'>Supervisor Approval: </p>
				<div className='flex items-center gap-5 mb-2'>
					<p>
						{project?.title.approvedBySupervisor
							? 'Approved by Supervisor'
							: 'Not Approved by Supervisor'}
					</p>
					<Button
						variant='outline'
						size='sm'
						onClick={() => {
							toggleApproval(!project?.title.approvedBySupervisor);
						}}
						disabled={approving}
						className={`${
							project?.title.approvedBySupervisor
								? 'bg-red-100 '
								: 'bg-green-100'
						}`}
					>
						Toggle
					</Button>
				</div>
			</div>
			<div className='flex flex-col '>
				<p className='font-medium text-sm'>Supervisor Comment: </p>
				{project?.title.supervisorComments ? (
					<p className='text-lg'>{project?.title.supervisorComments}</p>
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
	);
}
