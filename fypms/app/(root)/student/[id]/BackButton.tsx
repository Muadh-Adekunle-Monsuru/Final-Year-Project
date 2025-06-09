import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function BackButton() {
	return (
		<Link href={'/'} className='mb-4 w-fit'>
			<div className='border p-1 w-fit rounded-md'>
				<ChevronLeft className='size-5 text-muted-foreground' />
			</div>
		</Link>
	);
}
