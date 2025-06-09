'use client';
import { Sidebar, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import Link from 'next/link';
import CoordinatorSidebar from './coordinator-sidebar';
import { Button } from './ui/button';
import { useSession } from 'next-auth/react';
import StudentSidebar from './StudentSidebar';

export function AppSidebar() {
	const { data: session } = useSession();
	return (
		<Sidebar collapsible='icon'>
			<SidebarHeader>
				<h2
					className='font-bold p-1 text-xl flex-wrap
				 select-none truncate'
				>
					FYPMS
				</h2>
			</SidebarHeader>
			{session?.user.role == 'COORDINATOR' && <CoordinatorSidebar />}
			{session?.user.role == 'STUDENT' ||
				(session?.user.role == 'SUPERVISOR' && <StudentSidebar />)}
			<SidebarFooter>
				<Button variant='ghost' asChild>
					<Link href='/api/auth/signout' className='truncate'>
						Sign Out
					</Link>
				</Button>
			</SidebarFooter>
		</Sidebar>
	);
}
