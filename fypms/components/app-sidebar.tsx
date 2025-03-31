import { Sidebar, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import Link from 'next/link';
import CoordinatorSidebar from './coordinator-sidebar';
import { Button } from './ui/button';

export function AppSidebar() {
	return (
		<Sidebar collapsible='icon'>
			<SidebarHeader>
				<h2
					className='font-bold p-1 text-lg flex-wrap
				 select-none'
				>
					FYPMS
				</h2>
			</SidebarHeader>
			<CoordinatorSidebar />
			<SidebarFooter>
				<Button variant='ghost' asChild>
					<Link href='/api/auth/signout'>Sign Out</Link>
				</Button>
			</SidebarFooter>
		</Sidebar>
	);
}
