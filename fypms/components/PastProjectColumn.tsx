'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PastProjects } from '@prisma/client';
import Link from 'next/link';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const pastprojectscolumns: ColumnDef<PastProjects>[] = [
	{
		accessorKey: 'serialNumber',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					S.N.
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		size: 20,
	},
	{
		accessorKey: 'title',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Title
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
	{
		accessorKey: 'authors',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Author(s)
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			return row.original.authors.map((val, index) => (
				<span key={index} className='block'>
					{val}
				</span>
			));
		},
	},
	{
		accessorKey: 'year',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Year
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
	{
		accessorKey: 'Abstract',
		cell: ({ row }) => {
			if (row.original.projectLink) {
				return <Link href={row.original.projectLink}>view</Link>;
			}
			return '-';
		},
	},
	// {
	// 	id: 'actions',
	// 	cell: ({ row }) => {
	// 		const user = row.original;
	// 		const removeUser = async () => {
	// 			await deleteUser(user.id);
	// 			redirect('#');
	// 		};
	// 		return (
	// 			<DropdownMenu>
	// 				<DropdownMenuTrigger asChild>
	// 					<Button variant='ghost' className='h-8 w-8 p-0'>
	// 						<span className='sr-only'>Open menu</span>
	// 						<MoreHorizontal className='h-4 w-4' />
	// 					</Button>
	// 				</DropdownMenuTrigger>
	// 				<DropdownMenuContent align='end'>
	// 					<DropdownMenuLabel>
	// 						{/* <EditStudent student={user} /> */}
	// 					</DropdownMenuLabel>
	// 					<DropdownMenuItem onClick={removeUser}>Delete</DropdownMenuItem>
	// 				</DropdownMenuContent>
	// 			</DropdownMenu>
	// 		);
	// 	},
	// },
];
