'use client';
import React, { ChangeEvent, useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import Papa from 'papaparse';
import { createBulkStudents, createStudent } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const acceptableFileType =
	'application/vnd.ms-excel, application/csv, text/csv, text/plain, text/x-csv, text/comma-separated-values, ';

export default function UploadStudentCsv() {
	const router = useRouter();
	const [creating, setCreating] = useState(false);
	const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files[0];

		Papa.parse(file, {
			skipedEmptyLines: true,
			header: true,
			complete: async function (results) {
				console.log('Finished:', results.data);
				console.log('Errors:', results.errors);
				setCreating(true);

				Promise.all(
					results.data.map((student) => createStudent(student as any))
				)
					.then(() => {
						console.log('All students created successfully');
					})
					.catch((error) => {
						console.error('Error creating students:', error);
					})
					.finally(() => {
						router.refresh();
						setCreating(false);
					});
			},
		});
	};
	return (
		<div className='border p-2 rounded-2xl'>
			{creating ? (
				<div className='flex flex-col items-center justify-center'>
					<Loader2 className='animate-spin' />
					<p className='text-center text-sm'>
						Creating students... Please wait.
					</p>
				</div>
			) : (
				<div>
					<Label htmlFor='upload' className='mb-2'>
						Upload CSV
					</Label>
					<Input
						type='file'
						id='upload'
						onChange={onFileChange}
						accept={acceptableFileType}
					/>
					<p className='text-xs italic text-gray-500 mt-1'>
						Columns names: matricNo, firstName, lastName, CGPA
					</p>
				</div>
			)}
		</div>
	);
}
