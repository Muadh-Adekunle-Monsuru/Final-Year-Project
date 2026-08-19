import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function BackButton() {
	return (
		<Link
			href='/'
			className='inline-flex items-center gap-1 rounded-lg border bg-card px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground'
		>
			<ChevronLeft className='size-4' />
			Dashboard
		</Link>
	);
}
