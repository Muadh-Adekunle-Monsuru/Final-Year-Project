'use client';

import {
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
	Calendar1,
	FileStack,
	Home,
	SquareUser,
	UserPen,
	UserRound,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
	{
		title: 'Dashboard',
		url: '/',
		icon: Home,
	},
	{
		title: 'Students',
		url: '/students/add',
		icon: SquareUser,
	},
	{
		title: 'Supervisors',
		url: '/supervisors/add',
		icon: UserRound,
	},
	{
		title: 'Allocation',
		url: '/allocation',
		icon: UserPen,
	},
	{
		title: 'Past Projects',
		url: '/past-projects',
		icon: FileStack,
	},
	{
		title: 'Deadlines',
		url: '/deadlines',
		icon: Calendar1,
	},
];

function isActivePath(pathname: string, url: string) {
	if (url === '/') return pathname === '/';
	return pathname === url || pathname.startsWith(`${url}/`);
}

export default function CoordinatorSidebar() {
	const pathname = usePathname();
	return (
		<SidebarContent>
			<SidebarGroup>
				<SidebarGroupLabel>Application</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						{items.map((item) => (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton
									asChild
									isActive={isActivePath(pathname, item.url)}
								>
									<Link href={item.url}>
										<item.icon />
										<span className='text-sm'>{item.title}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
		</SidebarContent>
	);
}
