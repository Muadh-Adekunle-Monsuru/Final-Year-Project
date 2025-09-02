'use client';
import { Switch } from '@/components/ui/switch';
import { getName, saveAllocation } from '@/lib/auth';
import { Printer } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Input } from './ui/input';
import styles from './printstyle.module.css';
export default function GroupedAllocation({ groups }) {
	const contentRef = useRef<HTMLDivElement>(null);
	const reactToPrintFn = useReactToPrint({ contentRef });

	const router = useRouter();
	const [groupNames, setGroupNames] = useState({});
	const [allocationName, setAllocationName] = useState('');
	const [showCGPA, setShowCGPA] = useState(true);

	useEffect(() => {
		const fetchNames = async () => {
			const names = {};
			for (const key of Object.keys(groups)) {
				const name = await getName(key);
				if (name) {
					names[key] = `${name.firstName} ${name.lastName}`;
				}
			}
			setGroupNames(names);
			// console.log(names);
		};

		fetchNames();
	}, [groups]);

	const saveAllocationToDatabase = async () => {
		await saveAllocation({
			allocationName,
			groups: JSON.stringify(groups),
			supervisorNames: JSON.stringify(groupNames),
		});
		setAllocationName('');
		router.refresh();
		toast.success('Allocation saved successfully!');
	};

	return (
		<div className='border rounded-2xl grid divide-y-2 mt-5'>
			<div className='flex items-center gap-5 justify-between p-5'>
				<div className='flex items-center gap-3 max-w-xl'>
					<Input
						value={allocationName}
						onChange={(e) => setAllocationName(e.target.value)}
						type='text'
						id='name'
						placeholder='24/25 Draft 1'
					/>
					<Button onClick={() => saveAllocationToDatabase()}>
						Save Allocation
					</Button>
				</div>
				<div className=' flex items-center gap-3'>
					<Switch checked={showCGPA} onCheckedChange={(e) => setShowCGPA(e)} />
					<span>Show CGPA</span>
				</div>
				<Button onClick={() => reactToPrintFn()}>
					<Printer />
					Print
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
