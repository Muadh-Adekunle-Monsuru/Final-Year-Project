'use client';
import React from 'react';
import { Button } from './ui/button';
import { bulkPastQuestions } from '@/lib/auth';

export default function PastProjectForm() {
	const handleClick = async () => {
		await bulkPastQuestions();
	};
	return (
		<div>
			<Button onClick={handleClick}>Upload</Button>
		</div>
	);
}
