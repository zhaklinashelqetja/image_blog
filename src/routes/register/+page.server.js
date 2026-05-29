
import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/server/db';
import { hashPassword, createSession } from '$lib/server/auth';

export const actions = {
	register: async ({ request, cookies }) => {

		const formData = await request.formData();

		const username = formData.get('username');
		const email = formData.get('email');
		const password = formData.get('password');

        if (!username || !email || !password) {
			return fail(400, {
				error: 'All fields are required'
			});
		}

		let result;

		try {

			const hashedPassword = await hashPassword(password);

			[result] = await pool.execute(
				`INSERT INTO users 
				(username, email, password, role) 
				VALUES (?, ?, ?, ?)`,
				[username, email, hashedPassword, 'user']
			);

		} catch (error) {

			if (error.code === 'ER_DUP_ENTRY') {
				return fail(400, {
					error: 'Username or email already exists'
				});
			}

			return fail(500, {
				error: 'Something went wrong'
			});
		}

		const sessionId = await createSession(result.insertId);

		cookies.set('session', sessionId, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 30 
		});

		throw redirect(303, '/');
	}
};

