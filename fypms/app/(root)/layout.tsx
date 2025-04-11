'use client';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { SessionProvider } from 'next-auth/react';
import { EdgeStoreProvider } from '@/lib/edgestore';

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SidebarProvider>
			<SessionProvider>
				<EdgeStoreProvider>
					<AppSidebar />
					<main className='w-full'>
						<SidebarTrigger />
						{children}
					</main>
				</EdgeStoreProvider>
			</SessionProvider>
		</SidebarProvider>
	);
}
