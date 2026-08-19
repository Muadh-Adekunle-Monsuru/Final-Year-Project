'use client';
import { createPastProject } from '@/lib/auth';
import { Loader2, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Papa from 'papaparse';
import { ChangeEvent, useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

const acceptableFileType =
	'application/vnd.ms-excel, application/csv, text/csv, text/plain, text/x-csv, text/comma-separated-values, ';

type CsvRow = Record<string, string>;

function normalizeRow(row: CsvRow) {
	const normalized: CsvRow = {};
	for (const [key, value] of Object.entries(row)) {
		normalized[key.trim().toLowerCase()] = String(value ?? '').trim();
	}
	return {
		title: normalized.title,
		authors: normalized.authors || normalized.author,
		year: normalized.year,
		serialNumber: normalized.serialnumber || normalized.serial_number,
		supervisorNames:
			normalized.supervisornames ||
			normalized.supervisor ||
			normalized.supervisors,
		projectDescription:
			normalized.projectdescription || normalized.description,
		projectLink: normalized.projectlink || normalized.link,
	};
}

export default function UploadPastProjectCsv() {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [creating, setCreating] = useState(false);

	const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		Papa.parse<CsvRow>(file, {
			skipEmptyLines: true,
			header: true,
			complete: async function (results) {
				setCreating(true);
				const rows = results.data
					.map(normalizeRow)
					.filter((row) => row.title && row.year && row.authors);

				try {
					await Promise.all(rows.map((row) => createPastProject(row)));
					toast.success(
						`Uploaded ${rows.length} past project${rows.length === 1 ? '' : 's'}.`
					);
					setOpen(false);
				} catch (error) {
					console.error('Error creating past projects:', error);
					toast.error('Could not upload some past projects.');
				} finally {
					router.refresh();
					setCreating(false);
					event.target.value = '';
				}
			},
		});
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(next) => {
				if (creating) return;
				setOpen(next);
			}}
		>
			<DialogTrigger asChild>
				<Button>
					<Upload className='size-4' />
					Bulk upload CSV
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-lg'>
				<DialogHeader>
					<DialogTitle>Bulk upload past projects</DialogTitle>
					<DialogDescription>
						Import a CSV file to add multiple past projects at once.
					</DialogDescription>
				</DialogHeader>
				{creating ? (
					<div className='flex flex-col items-center justify-center gap-2 py-8'>
						<Loader2 className='size-8 animate-spin text-primary' />
						<p className='text-sm text-muted-foreground'>
							Creating past projects... Please wait.
						</p>
					</div>
				) : (
					<div className='space-y-4'>
						<div className='rounded-lg border bg-muted/50 p-4 text-sm'>
							<p className='font-medium text-foreground'>CSV format</p>
							<ul className='mt-2 list-disc space-y-1.5 pl-5 text-muted-foreground'>
								<li>
									Required columns:{' '}
									<code className='rounded bg-background px-1 py-0.5 text-xs'>
										title
									</code>
									,{' '}
									<code className='rounded bg-background px-1 py-0.5 text-xs'>
										authors
									</code>
									,{' '}
									<code className='rounded bg-background px-1 py-0.5 text-xs'>
										year
									</code>
								</li>
								<li>
									Optional:{' '}
									<code className='rounded bg-background px-1 py-0.5 text-xs'>
										serialNumber
									</code>
									,{' '}
									<code className='rounded bg-background px-1 py-0.5 text-xs'>
										supervisorNames
									</code>
									,{' '}
									<code className='rounded bg-background px-1 py-0.5 text-xs'>
										projectDescription
									</code>
									,{' '}
									<code className='rounded bg-background px-1 py-0.5 text-xs'>
										projectLink
									</code>
								</li>
								<li>
									Separate multiple authors with a semicolon{' '}
									<code className='rounded bg-background px-1 py-0.5 text-xs'>
										;
									</code>
								</li>
							</ul>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='past-project-upload'>Choose CSV file</Label>
							<Input
								type='file'
								id='past-project-upload'
								onChange={onFileChange}
								accept={acceptableFileType}
							/>
						</div>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
