'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send } from 'lucide-react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { nanoid } from 'nanoid';

interface Message {
	messageId: string;
	content: string;
	sender: 'supervisor' | 'student';
	timestamp: string;
}

export default function CollapsibleStudentSide({
	studentId,
	supervisorId,
}: {
	studentId: string;
	supervisorId: string;
}) {
	const [isOpen, setIsOpen] = useState(false);
	// const [messages, setMessages] = useState<Message[]>([]);
	const [inputValue, setInputValue] = useState('');
	const sendMessage = useMutation(api.chat.sendMessage);
	const messages =
		useQuery(api.chat.getMessages, { studentId, supervisorId }) || [];

	const handleSendMessage = async () => {
		if (inputValue.trim()) {
			const newMessage: Message = {
				messageId: nanoid(),
				content: inputValue,
				sender: 'student',
				timestamp: new Date().toISOString(),
			};
			await sendMessage({
				studentId,
				message: newMessage,
				supervisorId,
			});
			// setMessages([...messages, newMessage]);
			setInputValue('');
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSendMessage();
		}
	};

	return (
		<div className='fixed bottom-4 right-4 z-50'>
			{/* Chat Toggle Button */}
			{!isOpen && (
				<Button
					onClick={() => setIsOpen(true)}
					size='lg'
					className='rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-shadow'
				>
					<MessageCircle className='h-6 w-6' />
					<span className='sr-only'>Open chat</span>
				</Button>
			)}

			{/* Chat Window */}
			{isOpen && (
				<Card className='w-80 h-96 shadow-xl border-0 bg-background'>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-lg font-semibold'>
							Chat with Supervisor
						</CardTitle>
						<Button
							variant='ghost'
							size='sm'
							onClick={() => setIsOpen(false)}
							className='h-8 w-8 p-0'
						>
							<X className='h-4 w-4' />
							<span className='sr-only'>Close chat</span>
						</Button>
					</CardHeader>

					<CardContent className='flex flex-col h-full p-0'>
						{/* Messages Area */}
						<ScrollArea className='flex-1 px-4 pb-2'>
							<div className='space-y-3'>
								{messages.map((message) => (
									<div
										key={message.messageId}
										className={` relative flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
									>
										<div
											className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
												message.sender === 'student'
													? 'bg-primary text-primary-foreground'
													: 'bg-muted text-muted-foreground'
											}`}
										>
											{message.content}
										</div>
										{/* <p
											className={`
                                        ${
																					message.sender === 'student'
																						? 'right-0'
																						: 'left-0'
																				}
                                        text-[0.6rem] absolute -bottom-4 font-thin  text-muted-foreground`}
										>
											{new Date(message.timestamp).toLocaleTimeString()}
										</p> */}
									</div>
								))}
							</div>
						</ScrollArea>

						{/* Input Area */}
						<div className='border-t p-4'>
							<div className='flex space-x-2'>
								<Input
									placeholder='Type your message...'
									value={inputValue}
									onChange={(e) => setInputValue(e.target.value)}
									onKeyPress={handleKeyPress}
									className='flex-1'
								/>
								<Button
									onClick={handleSendMessage}
									size='sm'
									disabled={!inputValue.trim()}
								>
									<Send className='h-4 w-4' />
									<span className='sr-only'>Send message</span>
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
