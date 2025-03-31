'use client';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@prisma/client';
import { Supervisor } from './supervisor-columns';
import { useState } from 'react';
import { editStudent, editSupervisor } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export function EditSupervisor({ supervisor }: { supervisor: Supervisor }) {
	const router = useRouter();
	const [staffId, setStaffId] = useState(supervisor.name);
	const [firstName, setFirstName] = useState(supervisor.firstName);
	const [lastName, setLastName] = useState(supervisor.lastName);
	const [open, setOpen] = useState(false);

	const handleSubmit = async (event) => {
		// Handle form submission logic here, e.g., send data to the server
		event.preventDefault(); // Prevent the default form submission behavior
		console.log('Form submitted with values:', {
			staffId,
			firstName,
			lastName,
		});
		await editSupervisor({
			staffId,
			firstName,
			lastName,
			id: supervisor.id,
		});
		router.refresh();
		setOpen(false);
	};
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger className='cursor-pointer'>Edit Profile</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						Make changes to student profile here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<form className='grid gap-4 py-4' onSubmit={handleSubmit}>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='name' className='text-right'>
							Matric No:
						</Label>
						<Input
							id='name'
							value={staffId}
							onChange={(e) => setStaffId(e.target.value)}
							className='col-span-3'
						/>
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='firstname' className='text-right'>
							Firstname
						</Label>
						<Input
							id='firstname'
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							className='col-span-3'
						/>
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='lastname' className='text-right'>
							Lastname
						</Label>
						<Input
							id='lastname'
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							className='col-span-3'
						/>
					</div>

					<Button type='submit'>Save changes</Button>
				</form>
				<DialogFooter></DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
