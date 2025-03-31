import React from 'react';
import { getServerSession } from 'next-auth';
import { getStudents, getSupervisors, getUserDetails } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AddStudentInput from '@/components/add-student-input';
import { StudentDataTable } from '@/components/student-list-table';
import AddSupervisorInput from '@/components/add-supervisor-input';
import { SupervisorDataTable } from '@/components/supervisor-data-table';
import { supervisorColumns } from '@/components/supervisor-columns';
import UploadSupervisorCsv from '@/components/upload-supervisor-csv';

export default async function page() {
	const session = await getServerSession();
	const user = await getUserDetails(session?.user.name);
	if (user.role !== 'COORDINATOR') {
		redirect('/');
	}
	const supervisor = await getSupervisors();
	return (
		<div className='min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)] w-full'>
			<h1 className='text-4xl font-bold'>Create New Supervisor</h1>
			<p className='text-lg'>This is where supervisor accounts are created</p>
			<div className='flex items-center gap-5'>
				<UploadSupervisorCsv />
				<AddSupervisorInput />
			</div>
			<SupervisorDataTable columns={supervisorColumns} data={supervisor} />
		</div>
	);
}
