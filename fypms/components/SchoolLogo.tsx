'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

export function SchoolLogo({ className }: { className?: string }) {
	const [failed, setFailed] = useState(false);

	if (failed) {
		return (
			<div
				className={cn(
					'flex items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground',
					className
				)}
				aria-hidden
			>
				FU
			</div>
		);
	}

	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			src='/fuologo.jpg'
			alt='Fountain University'
			className={cn('object-contain', className)}
			onError={() => setFailed(true)}
		/>
	);
}
