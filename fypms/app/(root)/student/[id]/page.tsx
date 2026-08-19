import CollapsibleChat from '@/components/CollapsableChat';
import { Card, CardContent } from '@/components/ui/card';
import { getName, getTitle } from '@/lib/auth';
import { ExternalLink, FileText, User } from 'lucide-react';
import Link from 'next/link';
import BackButton from './BackButton';
import ShowStudentsChapters from './ShowStudentsChapter';
import SupervisorStudentPageCard from './SupervisorStudentPageCard';

export default async function SupervisorStudentPage(props: {
	params: Promise<{ id: string }>;
}) {
	const params = await props.params;
	const { id } = params;

	const studentName = await getName(id);
	const project = await getTitle({ studentId: id });
	const fullName = `${studentName.firstName} ${studentName.lastName}`;

	if (!project) {
		return (
			<div className='min-h-screen p-6 sm:p-8'>
				<BackButton />
				<Card className='mt-6 max-w-2xl gap-0 py-0 shadow-none'>
					<CardContent className='px-5 py-8'>
						<p className='font-semibold'>{fullName}</p>
						<p className='mt-1 text-sm text-muted-foreground'>
							This student has not submitted a project title yet.
						</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	const supervisorName = await getName(project.supervisorId);

	return (
		<div className='min-h-screen p-6 pb-20 sm:p-8'>
			<BackButton />
			<div className='mt-4 mb-6 flex items-center gap-3'>
				<div className='flex size-10 items-center justify-center rounded-full bg-brand-muted text-primary'>
					<User className='size-5' />
				</div>
				<div>
					<p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>
						Student project
					</p>
					<h1 className='text-2xl font-bold tracking-tight'>{fullName}</h1>
					<p className='text-sm text-muted-foreground'>{studentName.name}</p>
				</div>
			</div>

			<div className='max-w-3xl space-y-5'>
				<Card className='gap-0 py-0 shadow-none'>
					<CardContent className='space-y-4 px-5 py-5'>
						<div>
							<p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>
								Title
							</p>
							<p className='mt-1 text-lg font-semibold leading-snug'>
								{project.title.title}
							</p>
						</div>
						<div>
							<p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>
								Description
							</p>
							<p className='mt-1 text-sm leading-relaxed text-foreground/90'>
								{project.title.titleDescription}
							</p>
						</div>
						{project.title.proposalDocLink && (
							<Link
								href={project.title.proposalDocLink}
								target='_blank'
								className='inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline'
							>
								<FileText className='size-4' />
								View proposal document
								<ExternalLink className='size-3.5' />
							</Link>
						)}
					</CardContent>
				</Card>

				<SupervisorStudentPageCard project={project} />

				{project.chapters.length > 0 && (
					<ShowStudentsChapters
						project={project}
						studentName={fullName}
						supervisorName={`${supervisorName.firstName} ${supervisorName.lastName}`}
					/>
				)}
			</div>

			<CollapsibleChat
				studentId={project.studentId}
				supervisorId={project.supervisorId}
			/>
		</div>
	);
}
