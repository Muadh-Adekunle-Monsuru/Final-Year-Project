import { PastProjectDataTable } from '@/components/PastProjectDataTable';
import UploadPastProjectCsv from '@/components/upload-past-project-csv';
import { getPastQuestions, getUserDetails } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export default async function Page() {
	const session = await getServerSession();
	const user = await getUserDetails(session?.user.name);
	const data = await getPastQuestions();
	const canDelete =
		user.role === 'COORDINATOR' || user.role === 'SUPERVISOR';
	return (
		<div className='min-h-screen p-8 pb-10 font-[family-name:var(--font-geist-sans)]'>
			<div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
				<div>
					<h1 className='text-4xl font-bold'>View Past Projects</h1>
					<p className='mt-1 text-lg text-muted-foreground'>
						Browse previous projects. Search by title or author.
					</p>
				</div>
				{user.role === 'COORDINATOR' && <UploadPastProjectCsv />}
			</div>
			<PastProjectDataTable data={data} canDelete={canDelete} />
		</div>
	);
}
