import React from 'react';
import { getUserDetails } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { getSession } from 'next-auth/react';

export default function TopRightNameIcon() {
	// const session = await getServerSession();
	// const user = await getUserDetails(session?.user.name);
	return (
		<div className='flex gap-2 items-center'>
			<p>{/* {user.firstName} {user.lastName} */}</p>
			{/* <p>{user.role}</p> */}
			<p>{}</p>
		</div>
	);
}
