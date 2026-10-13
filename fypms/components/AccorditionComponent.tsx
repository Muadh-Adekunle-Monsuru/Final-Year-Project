import { Allocation } from '@prisma/client';
import React from 'react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import AccordionAllocation from './AccordionContent';

export default function AccorditionComponent({
	allocations,
}: {
	allocations: Allocation[];
}) {
	return (
		<div className='px-10'>
			<Accordion type='single' collapsible>
				{allocations.map((allocation) => (
					<AccordionItem value={allocation.id} key={allocation.id}>
						<AccordionTrigger>
							<span className='flex items-center gap-3'>
								{allocation.name}
								{allocation.isActive ? (
									<span className='rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary'>
										Active
									</span>
								) : null}
							</span>
						</AccordionTrigger>
						<AccordionContent>
							<AccordionAllocation
								allocationId={allocation.id}
								groupNames={JSON.parse(allocation.supervisorNames)}
								groups={JSON.parse(allocation.groups)}
								allocationName={allocation.name}
								isActive={Boolean(allocation.isActive)}
							/>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}
