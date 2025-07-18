import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { getSupervisors } from '@/lib/auth';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function SupervisorCard() {
	const supervisors = await getSupervisors();
	return (
		<Card className='w-fit'>
			<CardContent>
				<p className='font-bold p-2'> {supervisors.length} supervisors</p>
				<Table>
					<TableBody>
						{supervisors.slice(0, 5).map((student, index) => (
							<TableRow key={student.id}>
								<TableCell>{index + 1}</TableCell>
								<TableCell>
									{student.firstName} {student.lastName}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<Link
					href={'/supervisors/add'}
					className='flex gap-1 items-center mt-3 ml-2'
				>
					<p className='text-xs font-medium'>View All</p>
					<ArrowRight className='size-4 inline' />
				</Link>
			</CardContent>
		</Card>
	);
}
