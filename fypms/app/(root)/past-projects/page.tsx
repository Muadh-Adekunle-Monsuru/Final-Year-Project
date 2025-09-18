import { PastProjectDataTable } from '@/components/PastProjectDataTable';
import { pastprojectscolumns } from '@/components/PastProjectColumn';
import { getPastQuestions } from '@/lib/auth';

export default async function Page() {
	const data = await getPastQuestions();
	return (
		<div className='min-h-screen p-8 pb-10 font-[family-name:var(--font-geist-sans)]'>
			<h1 className='text-4xl font-bold'>View Past Projects</h1>
			<p className='text-lg'>View past project titles.</p>
			<PastProjectDataTable columns={pastprojectscolumns} data={data} />
		</div>
	);
}
