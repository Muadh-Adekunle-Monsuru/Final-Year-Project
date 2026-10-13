'use client';

import { CheckCircle2, Loader2, Printer } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import styles from './printstyle.module.css';
import { applyAllocation, deleteAllocation } from '@/lib/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function AccordionAllocation({
	groups,
	groupNames,
	allocationName,
	allocationId,
	isActive = false,
}) {
	const contentRef = useRef<HTMLDivElement>(null);
	const reactToPrintFn = useReactToPrint({
		contentRef,
		documentTitle: 'Student Allocations',
	});

	const [showCGPA, setShowCGPA] = useState(false);
	const [isApplying, setIsApplying] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const router = useRouter();

	async function handleUseAllocation() {
		if (isActive || isApplying) return;
		setIsApplying(true);
		try {
			await applyAllocation(allocationId);
			toast.success('This allocation is now active on student and supervisor portals.');
			router.refresh();
		} catch {
			toast.error('Could not apply this allocation. Please try again.');
		} finally {
			setIsApplying(false);
		}
	}

	async function handleDelete() {
		if (isDeleting) return;
		setIsDeleting(true);
		try {
			await deleteAllocation(allocationId);
			toast.success('Allocation deleted successfully');
			router.refresh();
		} catch {
			toast.error('Could not delete this allocation.');
		} finally {
			setIsDeleting(false);
		}
	}

	return (
		<div className='border rounded-2xl grid divide-y-2 mt-5'>
			<div className='flex flex-wrap items-center justify-center p-5 gap-4'>
				<div className=' flex items-center gap-3'>
					<Switch checked={showCGPA} onCheckedChange={(e) => setShowCGPA(e)} />
					<span>Show CGPA</span>
				</div>
				<Button onClick={() => reactToPrintFn()}>
					<Printer />
					Print
				</Button>
				<Button
					onClick={handleUseAllocation}
					disabled={isActive || isApplying}
					variant={isActive ? 'secondary' : 'default'}
				>
					{isApplying ? (
						<>
							<Loader2 className='animate-spin' />
							Applying…
						</>
					) : isActive ? (
						<>
							<CheckCircle2 />
							Currently in use
						</>
					) : (
						'Use this as allocation'
					)}
				</Button>
				<Button
					variant='destructive'
					onClick={handleDelete}
					disabled={isDeleting || isApplying}
				>
					{isDeleting ? (
						<>
							<Loader2 className='animate-spin' />
							Deleting…
						</>
					) : (
						'Delete Allocation'
					)}
				</Button>
			</div>
			<div ref={contentRef} className={styles.container}>
				<div className={`${styles.hider} text-center w-full p-2`}>
					<img src='/fuologo.jpg' className='w-20 h-20 mx-auto' alt='FU Logo' />
					<h1 className={`text-2xl font-bold`}>Fountain University, Osobgo</h1>
					<p>Department of Mathematical and Computer Sciences</p>
					<p>Supervisor-Student Allocation</p>
					<p>{allocationName}</p>
				</div>
				{Object.keys(groups).map((key) => (
					<div key={key} className='p-4 m-4 border rounded-md bg-white shadow'>
						{/* Group Heading */}
						<h2 className='text-xl font-semibold mb-4 border-b pb-2 px-2'>
							{groupNames[key] || 'Loading...'}
						</h2>

						{/* Table */}
						<div className='overflow-x-auto'>
							<table className='min-w-full text-sm border'>
								<thead className='bg-neutral-100 text-left'>
									<tr>
										<th className='px-4 py-2 border'>S/N</th>
										<th className='px-4 py-2 border'>Full Name</th>
										<th className='px-4 py-2 border'>Matric No</th>
										{showCGPA && <th className='px-4 py-2 border'>CGPA</th>}
									</tr>
								</thead>
								<tbody>
									{groups[key].map((student, index) => (
										<tr
											key={student.id}
											className='hover:bg-neutral-50 border-b'
										>
											<td className='px-4 py-2 border'>{index + 1}</td>
											<td className='px-4 py-2 border'>
												{student.firstName} {student.lastName}
											</td>
											<td className='px-4 py-2 border'>{student.name}</td>
											{showCGPA && (
												<td className='px-4 py-2 border'>{student.CGPA}</td>
											)}
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
