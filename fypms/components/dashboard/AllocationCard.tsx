import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { prisma } from '@/lib/client';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function AllocationCard() {
	const pastAllocations = await prisma.allocation.findMany({});

	return (
		<Card className='w-full'>
			<CardContent>
				<p className='font-bold p-2'>
					{' '}
					{pastAllocations.length} saved allocations
				</p>
				<Table>
					<TableBody>
						{pastAllocations.slice(0, 5).map((allocation, index) => (
							<TableRow key={allocation.id}>
								<TableCell>{index + 1}</TableCell>
								<TableCell>{allocation.name}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<Link
					href={'/allocation'}
					className='flex gap-1 items-center mt-3 ml-2'
				>
					<p className='text-xs font-medium'>View All</p>
					<ArrowRight className='size-4 inline' />
				</Link>
			</CardContent>
		</Card>
	);
}
