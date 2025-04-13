'use client';

export default function Allocation({ students }) {
	return (
		<div>
			{students.map((student) => (
				<div
					key={student.id}
					className='border rounded-2xl p-4 m-2 bg-blue-50 shadow'
				>
					<div>
						<h1>{student.name}</h1>
						<p>{student.CGPA}</p>
						<p>{student.supervisor}</p>
					</div>
				</div>
			))}
		</div>
	);
}
