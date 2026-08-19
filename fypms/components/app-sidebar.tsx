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
				<Link
					className='select-none truncate p-1 text-xl font-bold text-primary'
					href={'/'}
				>
					FYPMS
				</Link>
			</SidebarHeader>
			{session?.user.role == 'COORDINATOR' && <CoordinatorSidebar />}
			{(session?.user.role == 'STUDENT' ||
				session?.user.role == 'SUPERVISOR') && <StudentSidebar />}
			<SidebarFooter>
				<Button variant='ghost' className='justify-start text-muted-foreground' asChild>
					<Link href='/api/auth/signout' className='truncate'>
						Sign Out
					</Link>
				</Button>
			</SidebarFooter>
		</Sidebar>
	);
}
