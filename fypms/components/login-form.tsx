'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

function LoginFormInner({
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'>) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [name, setName] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [error, setError] = React.useState<string | null>(
		() => searchParams.get('error')
	);
	const [isLoading, setIsLoading] = React.useState(false);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);
		setIsLoading(true);

		try {
			const result = await signIn('credentials', {
				name,
				password,
				redirect: false,
			});

			if (result?.error) {
				setError(result.error);
				return;
			}

			router.push('/');
			router.refresh();
		} catch {
			setError('Something went wrong. Please try again.');
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className='text-2xl'>Login</CardTitle>
					<CardDescription>
						Enter your id below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className='flex flex-col gap-6'>
							{error && (
								<div
									role='alert'
									className='rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive'
								>
									{error}
								</div>
							)}
							<div className='grid gap-2'>
								<Label htmlFor='name'>Matric No</Label>
								<Input
									id='name'
									type='text'
									placeholder='FUO/XX/XXXX'
									required
									autoComplete='username'
									disabled={isLoading}
									value={name}
									onChange={(e) => {
										setName(e.target.value);
										if (error) setError(null);
									}}
								/>
							</div>
							<div className='grid gap-2'>
								<div className='flex items-center'>
									<Label htmlFor='password'>Password</Label>
								</div>
								<Input
									id='password'
									type='password'
									required
									autoComplete='current-password'
									disabled={isLoading}
									value={password}
									onChange={(e) => {
										setPassword(e.target.value);
										if (error) setError(null);
									}}
								/>
							</div>
							<Button type='submit' className='w-full' disabled={isLoading}>
								{isLoading ? (
									<>
										<Loader2 className='animate-spin' />
										Signing in…
									</>
								) : (
									'Login'
								)}
							</Button>
						</div>
						<div className='mt-4 text-center text-sm'>
							Don&apos;t have an account?{' '}
							<a href='#' className='underline underline-offset-4'>
								Speak with the project coordinator
							</a>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

export function LoginForm(props: React.ComponentPropsWithoutRef<'div'>) {
	return (
		<Suspense fallback={null}>
			<LoginFormInner {...props} />
		</Suspense>
	);
}
