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
	if (!matricNo || !firstName || !lastName || !CGPA) return;

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
	if (!staffId || !firstName || !lastName) return;
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
	//group and return students with their supervisors

	const groupsObj = {};
	const groups = (await Promise.all(allocatedStudents)).map(
		(student, index) => {
			if (!groupsObj[student.supervisor]) {
				groupsObj[student.supervisor] = [];
			}
			groupsObj[student.supervisor].push(students[index]);
		}
	);

	for (const key of Object.keys(groupsObj)) {
		const studentsId = groupsObj[key].map((student) => student.id);

		await prisma.user.update({
			where: { id: key },
			data: { supervisees: [...studentsId] },
		});
	}

	return groupsObj;
}

export async function getName(id: string) {
	const supervisor = await prisma.user.findFirst({
		where: { id },
		select: { firstName: true, lastName: true, name: true, id: true },
	});
	return supervisor;
}

export async function deleteUser(id: string) {
	return prisma.user.delete({ where: { id } });
}

export async function createBulkStudents(students: any) {
	const bulkStudents = await prisma.user.createMany({
		data: students,
	});
	return bulkStudents;
}
export async function createBulkSupervisors(supervisors: any) {
	const bulkSupervisors = await prisma.user.createMany({
		data: supervisors,
	});
	return bulkSupervisors;
}
export async function clearStudentTable() {
	await prisma.user.deleteMany({
		where: { role: 'STUDENT' },
	});
	return true;
}

export async function clearSupervisorTable() {
	await prisma.user.deleteMany({
		where: { role: 'SUPERVISOR' },
	});
	return true;
}

export async function editStudent(values: any) {
	const { matricNo, firstName, lastName, CGPA, id } = values;
	if (!matricNo || !firstName || !lastName || !CGPA) return;
	const user = await prisma.user.update({
		where: { id },
		data: {
			name: matricNo,
			firstName,
			lastName,
			CGPA,
		},
	});
	return user;
}

export async function editSupervisor(values: any) {
	const { staffId, firstName, lastName, id } = values;
	if (!staffId || !firstName || !lastName) return;
	const user = await prisma.user.update({
		where: { id },
		data: {
			name: staffId,
			firstName,
			lastName,
		},
	});
	return user;
}

export async function saveAllocation(values: any) {
	const { allocationName, groups, supervisorNames } = values;
	if (!allocationName || !groups) return;
	const allocation = await prisma.allocation.create({
		data: {
			name: allocationName,
			groups,
			supervisorNames,
		},
	});
	return allocation;
}

export async function UploadPastQuestions({ values }: { values: any }) {
	await prisma.pastProjects.create({
		data: values,
	});
}

export async function getPastQuestions() {
	const res = await prisma.pastProjects.findMany({
		orderBy: { year: 'desc' },
	});
	return res;
}

export async function createEvent({ name, date }) {
	const res = await prisma.deadlines.create({
		data: {
			name,
			date,
		},
	});
	return res;
}

export async function getEvents() {
	const res = await prisma.deadlines.findMany({});
	return res;
}

export async function deleteEvent(id: string) {
	await prisma.deadlines.delete({
		where: {
			id,
		},
	});
}

export async function createTitle({
	title,
	description,
	link,
	studentId,
	supervisorId,
}) {
	if (!title || !description) return;
	const res = await prisma.project.create({
		data: {
			title: {
				title,
				titleDescription: description,
				proposalDocLink: link,
			},
			studentId,
			supervisorId,
		},
	});
}

export async function getTitle({ studentId }) {
	const res = await prisma.project.findFirst({
		where: {
			studentId,
		},
	});

	return res;
}

export async function supervisorApproval(id: string, value: boolean) {
	const project = await prisma.project.findUnique({ where: { id } });

	const res = await prisma.project.update({
		where: { id },
		data: {
			title: {
				...project.title,
				approvedBySupervisor: value,
			},
		},
	});
	return res;
}

export async function supervisorComment(id: string, value: string) {
	const project = await prisma.project.findUnique({ where: { id } });

	const res = await prisma.project.update({
		where: { id },
		data: {
			title: {
				...project.title,
				supervisorComments: value,
			},
		},
	});
	return res;
}

export async function updateProject(
	id: string,
	value: { title: string; titleDescription: string; proposalDocLink: string }
) {
	const project = await prisma.project.findUnique({ where: { id } });

	const res = await prisma.project.update({
		where: { id },
		data: {
			title: {
				...project.title,
				...value,
			},
		},
	});
	return res;
}

export async function uploadChapter(
	id: string,
	value: { chapterLink: string; chapterNumber: number; chapterId: string }
) {
	const project = await prisma.project.findUnique({ where: { id } });

	const res = await prisma.project.update({
		where: { id },
		data: {
			chapters: [
				...project.chapters,
				{
					...value,
					approved: false,
				},
			],
		},
	});
	return res;
}

export async function getChapters({ studentId }) {
	const res = await prisma.project.findFirst({
		where: {
			studentId,
		},
	});

	return res.chapters;
}

export async function approveChapter(id: string, chapterId: string) {
	const project = await prisma.project.findUnique({ where: { id } });

	const res = await prisma.project.update({
		where: { id },
		data: {
			chapters: project.chapters.map((chapter) => {
				if (chapter.chapterId === chapterId) {
					return { ...chapter, approved: !chapter.approved };
				}
				return chapter;
			}),
		},
	});
	return res;
}
