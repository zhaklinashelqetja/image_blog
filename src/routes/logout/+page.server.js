import pool from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export const actions = {
	logout: async ({ cookies }) => {
		const sessionId = cookies.get('session');

		if (sessionId) {
			await pool.execute(
				'DELETE FROM sessions WHERE id = ?',
				[sessionId]
			);
		}

		cookies.delete('session', { path: '/' });

		throw redirect(303, '/');
	}
};