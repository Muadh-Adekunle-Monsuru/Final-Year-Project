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
import { editStudent } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Student } from './student-columns';

export function EditStudent({ student }: { student: Student }) {
	const router = useRouter();
	const [matricNo, setMatricNo] = useState(student.name);
	const [firstName, setFirstName] = useState(student.firstName);
	const [lastName, setLastName] = useState(student.lastName);
	const [CGPA, setCGPA] = useState(student.CGPA);
	const [open, setOpen] = useState(false);

	const handleSubmit = async (event) => {
		// Handle form submission logic here, e.g., send data to the server
		event.preventDefault(); // Prevent the default form submission behavior
		console.log('Form submitted with values:', {
			matricNo,
			firstName,
			lastName,
			CGPA,
		});
		await editStudent({
			id: student.id,
			matricNo,
			firstName,
			lastName,
			CGPA,
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
						Make changes to student profile here. Click save when you are done.
					</DialogDescription>
				</DialogHeader>
				<form className='grid gap-4 py-4' onSubmit={handleSubmit}>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='name' className='text-right'>
							Matric No:
						</Label>
						<Input
							id='name'
							value={matricNo}
							onChange={(e) => setMatricNo(e.target.value)}
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
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='cgpa' className='text-right'>
							CGPA
						</Label>
						<Input
							id='cgpa'
							value={CGPA}
							onChange={(e) => setCGPA(e.target.value)}
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
