'use client';
import { SessionProvider } from 'next-auth/react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import TopRightNameIcon from '@/components/TopRightNameIcon';

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className='w-full'>
				<SessionProvider>
					<SidebarTrigger />
					{children}
				</SessionProvider>
			</main>
		</SidebarProvider>
	);
}
