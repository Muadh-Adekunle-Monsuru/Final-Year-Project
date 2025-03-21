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
import { createStudent, createSupervisor } from '@/lib/auth';
import { useRouter } from 'next/navigation';
const formSchema = z.object({
	staffId: z
		.string()
		.regex(/^FUO\/\d{2}\/\d{4}$/, 'Invalid matric number format'),
	firstName: z.string().min(2).max(50),
	lastName: z.string().min(2).max(50),
});

export default function AddSupervisorInput() {
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			staffId: '',
			firstName: '',
			lastName: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		await createSupervisor(values);
		form.reset();
		router.refresh();
	}
	return (
		<Form {...form}>
			<form
				className='border w-full p-3 my-2 flex items-center justify-center gap-5 rounded-2xl'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name='staffId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Staff ID</FormLabel>
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

				<Button type='submit'>Create</Button>
			</form>
		</Form>
	);
}
