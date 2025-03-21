import React from 'react';
import { getServerSession } from 'next-auth';
import { getStudents, getUserDetails } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AddStudentInput from '@/components/add-student-input';
import { StudentDataTable } from '@/components/student-list-table';
import { columns } from '@/components/student-columns';

export default async function page() {
	const session = await getServerSession();
	const user = await getUserDetails(session?.user.name);
	if (user.role !== 'COORDINATOR') {
		redirect('/');
	}
	const students = await getStudents();
	return (
		<div className='min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)] w-full'>
			<h1 className='text-4xl font-bold'>Create New Students</h1>
			<p className='text-lg'>This is where student accounts are created</p>
			<AddStudentInput />
			<StudentDataTable columns={columns} data={students} />
		</div>
	);
}
