import { redirect } from '@sveltejs/kit';

export const load = async () => {
	throw redirect(302, '/');
};

export const actions = {
	default: async ({ cookies }) => {
		cookies.set('session', '', {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 0
		});

		throw redirect(302, '/login');
	}
};
