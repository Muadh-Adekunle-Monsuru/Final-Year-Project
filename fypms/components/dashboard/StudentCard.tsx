import DashboardSummaryCard from '@/components/dashboard/DashboardSummaryCard';
import { getStudents } from '@/lib/auth';

export default async function StudentCard() {
	const students = await getStudents();
	return (
		<DashboardSummaryCard
			title={`${students.length} students`}
			href='/students/add'
			emptyMessage='No students registered yet.'
			items={students.slice(0, 5).map((student) => ({
				id: student.id,
				label: `${student.firstName} ${student.lastName}`,
			}))}
		/>
	);
}
