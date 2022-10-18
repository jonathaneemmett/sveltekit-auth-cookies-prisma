import { invalid, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

import { db } from '$lib/database.js';

export const load = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/');
	}
};

export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		if (!username || !password) {
			return invalid(400, { invalid: true });
		}

		const user = await db.user.findUnique({ where: { username } });
		if (!user) {
			return invalid(400, { credentials: true });
		}

		if (!(await bcrypt.compare(password, user.passwordHash))) {
			return invalid(400, { credientials: true });
		}

		const authenticatedUser = await db.user.update({
			where: { username: user.username },
			data: { userAuthToken: crypto.randomUUID() }
		});

		cookies.set('session', authenticatedUser.userAuthToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7 // 1 week
		});

		throw redirect(302, '/');
	}
};
