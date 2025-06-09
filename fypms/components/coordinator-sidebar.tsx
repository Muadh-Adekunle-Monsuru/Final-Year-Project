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
];
export default function CoordinatorSidebar() {
	return (
		<SidebarContent>
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
