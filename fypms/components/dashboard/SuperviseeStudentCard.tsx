'use client';
import { Project } from '@prisma/client';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export default function SuperviseeStudentCard({
	student,
}: {
	student: {
		id: string;
		name: string;
		matric: string;
		project?: Project;
	};
}) {
	return (
		<Card className='flex h-full min-w-0 flex-col gap-0 py-0 shadow-none transition-colors hover:bg-accent/40'>
			<CardContent className='flex flex-1 flex-col px-5 py-4'>
				<h2 className='text-lg font-semibold'>{student?.name}</h2>
				<p className='text-sm text-primary'>{student?.matric}</p>
				{student?.project?.id && (
					<div className='mt-3 min-w-0'>
						<p className='text-sm font-medium text-muted-foreground'>
							Project title
						</p>
						<p className='truncate text-sm'>{student?.project?.title?.title}</p>
					</div>
				)}
			</CardContent>
			{student?.project?.id && (
				<CardFooter className='justify-end px-5 pb-4 pt-0'>
					<Link
						href={`/student/${student.id}`}
						className='inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline'
					>
						View project
						<ArrowRight className='size-3.5' />
					</Link>
				</CardFooter>
			)}
		</Card>
	);
}
