'use client';
import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '../ui/button';
import { UploadButton } from '@/lib/uploadthing';

export default function ProjectTitle() {
	return (
		<div className='p-3 border rounded-3xl'>
			<div className='flex items-center gap-2'>
				<Label>Title:</Label>
				<Input placeholder='Design and Implementation of a digital ...' />
			</div>
			<div className='flex items-center gap-2'>
				<Label>Description:</Label>
				<Textarea
					placeholder='Short description of the project'
					className='w-full'
				/>
			</div>
			<div>
				<UploadButton
					endpoint='imageUploader'
					onClientUploadComplete={(res) => {
						// Do something with the response
						console.log('Files: ', res);
					}}
					onUploadError={(error: Error) => {
						// Do something with the error.
						alert(`ERROR! ${error.message}`);
					}}
				/>
			</div>
			<Button>Submit</Button>
		</div>
	);
}
