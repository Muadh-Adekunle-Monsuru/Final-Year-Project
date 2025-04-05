'use client';
import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { createStudent } from '@/lib/auth';
import { useRouter } from 'next/navigation';
const formSchema = z.object({
	matricNo: z
		.string()
		.regex(/^FUO\/\d{2}\/\d{4}$/, 'Invalid matric number format'),
	firstName: z.string().min(2).max(50),
	lastName: z.string().min(2).max(50),
	CGPA: z.string().min(0).max(5),
});

export default function AddStudentInput() {
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			matricNo: '',
			firstName: '',
			lastName: '',
			CGPA: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		await createStudent(values);
		form.reset();
		router.refresh();
	}
	return (
		<Form {...form}>
			<form
				className='border w-full p-3 my-2 flex flex-col md:flex-row items-center justify-center gap-5 rounded-2xl'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name='matricNo'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Matric No</FormLabel>
							<FormControl>
								<Input placeholder='FUO/XX/XXXX' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='firstName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>First Name</FormLabel>
							<FormControl>
								<Input placeholder='John' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='lastName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Last Name</FormLabel>
							<FormControl>
								<Input placeholder='Doe' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='CGPA'
					render={({ field }) => (
						<FormItem>
							<FormLabel>CGPA</FormLabel>
							<FormControl>
								<Input placeholder='5.0' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit'>Create</Button>
			</form>
		</Form>
	);
}
