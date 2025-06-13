import AddSupervisorInput from '@/components/add-supervisor-input';
import { supervisorColumns } from '@/components/supervisor-columns';
import { SupervisorDataTable } from '@/components/supervisor-data-table';
import UploadSupervisorCsv from '@/components/upload-supervisor-csv';
import { getSupervisors, getUserDetails } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

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
			<div className='flex flex-col lg:flex-row items-center gap-5 mt-3'>
				<UploadSupervisorCsv />
				<AddSupervisorInput />
			</div>
			<SupervisorDataTable columns={supervisorColumns} data={supervisor} />
		</div>
	);
}
