import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

type DashboardSummaryCardProps = {
	title: string;
	href: string;
	items: { id: string; label: string }[];
	emptyMessage?: string;
	className?: string;
};

export default function DashboardSummaryCard({
	title,
	href,
	items,
	emptyMessage = 'Nothing to show yet.',
	className,
}: DashboardSummaryCardProps) {
	return (
		<Card
			className={cn(
				'flex h-full min-w-0 flex-col gap-0 py-0 shadow-none',
				className
			)}
		>
			<CardContent className='flex flex-1 flex-col px-5 py-5'>
				<h2 className='pb-3 text-base font-bold'>{title}</h2>
				<div className='border-t border-border pt-3'>
					{items.length === 0 ? (
						<p className='text-sm text-muted-foreground'>{emptyMessage}</p>
					) : (
						<ol className='space-y-2.5'>
							{items.map((item, index) => (
								<li
									key={item.id}
									className='flex min-w-0 gap-3 text-sm text-foreground'
								>
									<span className='w-4 shrink-0 tabular-nums text-muted-foreground'>
										{index + 1}
									</span>
									<span className='min-w-0 truncate'>{item.label}</span>
								</li>
							))}
						</ol>
					)}
				</div>
			</CardContent>
			<CardFooter className='mt-auto justify-end px-5 pb-4 pt-0'>
				<Link
					href={href}
					className='inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline'
				>
					View All
					<ArrowRight className='size-3.5' />
				</Link>
			</CardFooter>
		</Card>
	);
}
