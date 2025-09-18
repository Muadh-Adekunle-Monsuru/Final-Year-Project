// app/api/auth/error/page.tsx
'use client';

import { Button } from '@/components/ui/button';
import { useSearchParams, useRouter } from 'next/navigation';

export default function AuthErrorPage() {
	const params = useSearchParams();
	const router = useRouter();
	const error = params.get('error');

	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<h1 className='text-2xl font-bold'>Authentication Error</h1>
			<p>{error ?? 'An unknown error occurred.'}</p>
			<Button
				onClick={() => router.push('/auth/signin')}
				className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
			>
				Go Back
			</Button>
		</div>
	);
}
