'use client';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { createSupervisor } from '@/lib/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
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
				className='border w-full p-3 my-2 flex flex-col md:flex-row items-center justify-center gap-5 rounded-2xl'
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
