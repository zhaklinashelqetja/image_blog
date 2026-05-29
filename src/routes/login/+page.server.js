
import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/server/db';
import { verifyPassword, createSession } from '$lib/server/auth';

export const actions = {
	login: async ({ request, cookies }) => {

		const formData = await request.formData();

		const username = formData.get('username');
		const password = formData.get('password');

		if (!username || !password) {
			return fail(400, {
				error: 'Username and password are required'
			});
		}

		const [rows] = await pool.execute(
			'SELECT * FROM users WHERE username = ?',
			[username]
		);

		if (rows.length === 0) {
			return fail(401, {
				error: 'Invalid username or password'
			});
		}

		const user = rows[0];

		const validPassword = await verifyPassword(
			password,
			user.password
		);

		if (!validPassword) {
			return fail(401, {
				error: 'Invalid username or password'
			});
		}

		const sessionId = await createSession(user.id);

		cookies.set('session', sessionId, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 30
		});

		throw redirect(303, '/');
	}
};
