'use client';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { SessionProvider } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { getUserDetails } from '@/lib/auth';

export default async function Home() {
	const session = await getServerSession(options);
	const user = await getUserDetails(session?.user.name);
	return (
		<div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			<h1 className='text-4xl font-bold'>Welcome to Next.js</h1>
			<p className='text-lg'>This is a Next.js app with authentication!</p>
			{JSON.stringify(user)}
		</div>
	);
}
