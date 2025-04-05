'use client';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { SessionProvider } from 'next-auth/react';
export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SidebarProvider>
			<SessionProvider>
				<AppSidebar />
				<main className='w-full'>
					<SidebarTrigger />
					{children}
				</main>
			</SessionProvider>
		</SidebarProvider>
	);
}
