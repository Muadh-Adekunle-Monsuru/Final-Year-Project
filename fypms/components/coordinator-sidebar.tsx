import React from 'react';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
	Calendar,
	Home,
	Inbox,
	Search,
	Settings,
	SquareUser,
	UserRound,
	UserPen,
	FileStack,
	Calendar1,
} from 'lucide-react';
import Link from 'next/link';
import TopRightNameIcon from './TopRightNameIcon';

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
		url: 'past-projects',
		icon: FileStack,
	},
	{
		title: 'Deadlines',
		url: '/deadlines',
		icon: Calendar1,
	},
	{
		title: 'Settings',
		url: '/settings',
		icon: Settings,
	},
];
export default function CoordinatorSidebar() {
	return (
		<SidebarContent>
			{/* <SidebarGroup>
				<SidebarGroupLabel>User</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						<SidebarMenuItem>
							<TopRightNameIcon />
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup> */}
			<SidebarGroup>
				<SidebarGroupLabel>Application</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						{items.map((item) => (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton asChild>
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
