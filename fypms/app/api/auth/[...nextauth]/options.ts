import { verifyPassword } from '@/lib/auth';
import { prisma } from '@/lib/client';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				name: {
					label: 'ID (Matric/Staff ID)',
					type: 'text',
					placeholder: 'FUO220099',
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: '*******',
				},
			},
			async authorize(credentials) {
				if (!credentials?.name || !credentials?.password) {
					throw new Error('ID and password are required.');
				}
				const user = await prisma.user.findFirst({
					where: { name: credentials.name },
				});

				if (!user) {
					throw new Error('No user found.');
				}

				const isValid = await verifyPassword(
					credentials.password,
					user.passwordHashed
				);

				if (!isValid) {
					throw new Error('Invalid password.');
				}
				user.passwordHashed = undefined;
				return user;
			},
		}),
	],
	pages: {
		signIn: '/auth/signin', // Custom login page
	},
	callbacks: {
		jwt({ token, user }) {
			if (user) token.role = user.role;
			return token;
		},
		session({ session, token }) {
			session.user.role = token.role;
			return session;
		},
	},
};
