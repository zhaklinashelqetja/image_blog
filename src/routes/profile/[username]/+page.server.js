
import pool from '$lib/server/db';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const { username } = params;

	const [users] = await pool.execute(
		'SELECT id, username, created_at FROM users WHERE username = ?',
		[username]
	);

	if (users.length === 0) {
		throw error(404, 'User not found');
	}

	const user = users[0];

	const [images] = await pool.execute(
		'SELECT * FROM images WHERE author_id = ? ORDER BY created_at DESC',
		[user.id]
	);

	return {
		profileUser: user,
		images
	};
}

