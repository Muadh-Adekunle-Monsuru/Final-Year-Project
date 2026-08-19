'use client';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { supervisorApproval, supervisorComment } from '@/lib/auth';
import { Project } from '@prisma/client';
import { CircleCheck, CircleX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function SupervisorStudentPageCard({
	project,
}: {
	project: Project;
}) {
	const router = useRouter();
	const [approving, setApproving] = useState(false);
	const [comment, setComment] = useState(
		project?.title?.supervisorComments ?? ''
	);
	const approved = Boolean(project?.title?.approvedBySupervisor);

	const submitSupervisorComment = async () => {
		if (!comment.trim()) {
			toast.error('Write a comment before submitting.');
			return;
		}
		setApproving(true);
		try {
			await supervisorComment(project.id, comment.trim());
			toast.success('Comment saved.');
			router.refresh();
		} finally {
			setApproving(false);
		}
	};

	const toggleApproval = async (value: boolean) => {
		setApproving(true);
		try {
			await supervisorApproval(project.id, value);
			toast.success(value ? 'Title approved.' : 'Approval withdrawn.');
			router.refresh();
		} finally {
			setApproving(false);
		}
	};

	return (
		<Card className='gap-0 py-0 shadow-none'>
			{approving && <Loader />}
			<CardContent className='space-y-5 px-5 py-5'>
				<div>
					<p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>
						Title approval
					</p>
					<div className='mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
						<div className='flex items-center gap-2'>
							{approved ? (
								<CircleCheck className='size-5 text-primary' />
							) : (
								<CircleX className='size-5 text-muted-foreground' />
							)}
							<span className='text-sm font-medium'>
								{approved ? 'Approved' : 'Not approved yet'}
							</span>
						</div>
						<Button
							variant={approved ? 'outline' : 'default'}
							size='sm'
							onClick={() => toggleApproval(!approved)}
							disabled={approving}
						>
							{approved ? 'Withdraw approval' : 'Approve title'}
						</Button>
					</div>
				</div>
				<div>
					<p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>
						Feedback for student
					</p>
					<Textarea
						placeholder='Write feedback on the title or proposal…'
						className='mt-2 min-h-24'
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
					<Button
						size='sm'
						className='mt-2'
						onClick={() => submitSupervisorComment()}
						disabled={approving}
					>
						{project?.title?.supervisorComments
							? 'Update comment'
							: 'Submit comment'}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
