'use server';
import bycrpt from 'bcryptjs';
import { prisma } from './client';
export async function hashPassword(password: string) {
	const saltRounds = 10;
	return bycrpt.hash(password, saltRounds);
}
export async function verifyPassword(password: string, hashedPassword: string) {
	return await bycrpt.compare(password, hashedPassword);
}

export async function getUserDetails(name: string) {
	const user = await prisma.user.findFirst({
		where: { name },
		omit: { passwordHashed: true },
	});
	if (!user) {
		throw new Error('No user found.');
	}
	return user;
}

export async function createStudent({
	firstName,
	lastName,
	matricNo,
	CGPA,
}: {
	firstName?: string;
	lastName?: string;
	matricNo?: string;
	CGPA?: string;
}) {
	const passwordHashed = await hashPassword(lastName.toLocaleLowerCase());
	const user = await prisma.user.create({
		data: {
			name: matricNo,
			passwordHashed,
			firstName,
			lastName,
			CGPA,
		},
	});
	return user;
}

export async function createSupervisor({
	firstName,
	lastName,
	staffId,
}: {
	firstName?: string;
	lastName?: string;
	staffId?: string;
}) {
	const passwordHashed = await hashPassword(lastName.toLocaleLowerCase());
	const user = await prisma.user.create({
		data: {
			name: staffId,
			passwordHashed,
			firstName,
			lastName,
			role: 'SUPERVISOR',
		},
	});
	return user;
}

export async function getStudents() {
	const students = await prisma.user.findMany({
		where: { role: 'STUDENT' },
		omit: { passwordHashed: true },
	});

	return students;
}

export async function getSupervisors() {
	const supervisors = await prisma.user.findMany({
		where: { role: 'SUPERVISOR' },
		omit: { passwordHashed: true },
	});
	return supervisors;
}

export async function allocateSupervisors() {
	const students = await getStudents();
	students.sort((a, b) => parseFloat(b.CGPA) - parseFloat(a.CGPA));
	const supervisors = await getSupervisors();
	const allocatedStudents = students.map((student, index) => {
		const supervisor = supervisors[index % supervisors.length];
		return prisma.user.update({
			where: { id: student.id },
			data: { supervisor: supervisor.id },
		});
	});
	return Promise.all(allocatedStudents);
}
