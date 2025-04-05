import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { getPastQuestions } from '@/lib/auth';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function PastProjectCard() {
	const data = await getPastQuestions();

	return (
		<Card className='lg:max-w-sm w-full '>
			<CardContent>
				<p className='font-bold p-2'>{data.length} past projects</p>
				<Table>
					<TableBody>
						{data.slice(0, 5).map((paper, index) => (
							<TableRow key={paper.id}>
								<TableCell>{index + 1}</TableCell>
								<TableCell className='uppercase truncate'>
									<span className='text-balance'>{paper.title}</span>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<Link
					href={'/past-projects'}
					className='flex gap-1 items-center mt-3 ml-2'
				>
					<p className='text-xs font-medium'>View All</p>
					<ArrowRight className='size-4 inline' />
				</Link>
			</CardContent>
		</Card>
	);
}
