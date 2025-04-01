import { Sidebar, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import Link from 'next/link';
import CoordinatorSidebar from './coordinator-sidebar';
import { Button } from './ui/button';

export function AppSidebar() {
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
			<CoordinatorSidebar />
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
