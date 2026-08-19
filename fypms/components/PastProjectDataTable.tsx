'use client';

import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from '@tanstack/react-table';

import { getPastProjectColumns } from '@/components/PastProjectColumn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { PastProjects } from '@prisma/client';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

interface DataTableProps {
	data: PastProjects[];
	canDelete?: boolean;
}

export function PastProjectDataTable({
	data,
	canDelete = false,
}: DataTableProps) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState('');
	const columns = useMemo(
		() => getPastProjectColumns(canDelete),
		[canDelete]
	);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		onGlobalFilterChange: setGlobalFilter,
		globalFilterFn: (row, _columnId, filterValue) => {
			const query = String(filterValue ?? '')
				.toLowerCase()
				.trim();
			if (!query) return true;

			const project = row.original as {
				title?: string;
				authors?: string[];
				year?: string;
				serialNumber?: string | null;
				supervisorNames?: string | null;
			};

			const authors = Array.isArray(project.authors)
				? project.authors.join(' ')
				: '';

			const haystack = [
				project.title,
				authors,
				project.year,
				project.serialNumber,
				project.supervisorNames,
			]
				.filter(Boolean)
				.join(' ')
				.toLowerCase();

			return haystack.includes(query);
		},
		state: {
			sorting,
			globalFilter,
		},
	});

	return (
		<div className='mt-8'>
			<div className='relative mb-4 max-w-sm'>
				<Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
				<Input
					type='search'
					value={globalFilter ?? ''}
					onChange={(e) => setGlobalFilter(e.target.value)}
					placeholder='Search by title or author...'
					className='h-10 bg-card pl-9 shadow-sm'
				/>
			</div>
			<div className='w-full rounded-xl border bg-card shadow-sm'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className='max-w-xs'>
											{cell.column.id === 'actions' ? (
												flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)
											) : (
												<p className='text-balance uppercase'>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext()
													)}
												</p>
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'
								>
									No results found.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className='flex items-center justify-end space-x-2 py-4'>
				<Button
					variant='outline'
					size='sm'
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>
				<Button
					variant='outline'
					size='sm'
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Next
				</Button>
			</div>
		</div>
	);
}
