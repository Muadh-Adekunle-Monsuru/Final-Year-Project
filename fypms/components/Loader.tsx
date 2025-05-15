import { Loader2 } from 'lucide-react';
import React from 'react';

export default function Loader() {
	return (
		<div className='fixed h-full min-h-screen w-full top-0 left-0 flex items-center justify-center bg-white/50 z-50'>
			<Loader2 className='size-5 animate-spin' />
		</div>
	);
}
