
import pool from '$lib/server/db.js';

export async function load() {
	const [images] = await pool.query(`
		SELECT i.id, i.image, i.description, i.votes, i.created_at, u.username AS author
		FROM images i
		JOIN users u ON i.author_id = u.id
		ORDER BY i.votes DESC, i.created_at DESC
		LIMIT 25`);

	return { images };
}

