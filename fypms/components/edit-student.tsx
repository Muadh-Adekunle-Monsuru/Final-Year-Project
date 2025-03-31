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
import { Student } from './student-columns';
import { useState } from 'react';

export function EditStudent({ student }: { student: Student }) {
	const [matricNo, setMatricNo] = useState(student.name);
	const [firstName, setFirstName] = useState(student.firstName);
	const [lastName, setLastName] = useState(student.lastName);
	const [CGPA, setCGPA] = useState(student.CGPA);
	return (
		<Dialog>
			<DialogTrigger className='cursor-pointer'>Edit Profile</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						Make changes to student profile here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<div className='grid gap-4 py-4'>
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
				</div>
				<DialogFooter>
					<Button type='submit'>Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
