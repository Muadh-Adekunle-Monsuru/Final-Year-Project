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
						<AccordionTrigger>{allocation.name}</AccordionTrigger>
						<AccordionContent>
							<AccordionAllocation
								groupNames={JSON.parse(allocation.supervisorNames)}
								groups={JSON.parse(allocation.groups)}
								allocationName={allocation.name}
							/>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}
