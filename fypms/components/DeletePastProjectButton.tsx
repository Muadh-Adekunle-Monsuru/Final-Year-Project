'use client';

import { deletePastProject } from '@/lib/auth';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';

export default function DeletePastProjectButton({
	id,
	title,
}: {
	id: string;
	title: string;
}) {
	const router = useRouter();
	const [deleting, setDeleting] = useState(false);

	const handleDelete = async () => {
		if (
			!window.confirm(
				`Delete “${title}”? This cannot be undone.`
			)
		) {
			return;
		}

		setDeleting(true);
		try {
			await deletePastProject(id);
			toast.success('Past project deleted.');
			router.refresh();
		} catch {
			toast.error('Could not delete this past project.');
		} finally {
			setDeleting(false);
		}
	};

	return (
		<Button
			type='button'
			variant='ghost'
			size='sm'
			className='text-destructive hover:bg-destructive/10 hover:text-destructive'
			onClick={handleDelete}
			disabled={deleting}
			aria-label={`Delete ${title}`}
		>
			<Trash2 className='size-4' />
			<span className='sr-only sm:not-sr-only'>Delete</span>
		</Button>
	);
}
