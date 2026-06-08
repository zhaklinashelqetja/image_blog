import { fail, redirect } from '@sveltejs/kit';
import { put, del } from '@vercel/blob';
import pool from '$lib/server/db';

export async function load({ locals }) {
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	const [images] = await pool.execute(
		'SELECT * FROM images WHERE author_id = ? ORDER BY created_at DESC',
		[locals.user.id]);

	return {
		user: locals.user,
		images};
}

export const actions = {
	upload: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(303, '/login');
		}

		const formData = await request.formData();
		const file = formData.get('image');
		const description = formData.get('description') || '';

		if (!file || file.size === 0) {
			return fail(400, {
				error: 'Please select an image.'});
		}

		if (!file.type.startsWith('image/')) {
			return fail(400, {
				error: 'Only image files are allowed.'});
		}

		const blob = await put(file.name, file, {
			access: 'public'});

		await pool.execute(
			'INSERT INTO images (image, description, author_id) VALUES (?, ?, ?)',
			[blob.url, description, locals.user.id]
		);

		return {
			success: true
		};
	},

	delete: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(303, '/login');
		}

		const formData = await request.formData();
		const imageId = formData.get('imageId');
		const [rows] = await pool.execute(
			'SELECT * FROM images WHERE id = ? AND author_id = ?',
			[imageId, locals.user.id]
		);

		if (rows.length === 0) {
			return fail(403, {
				error: 'Image not found.'
			});
		}

		const image = rows[0];
		await del(image.image);
		await pool.execute(
			'DELETE FROM images WHERE id = ?',
			[imageId]
		);
		return {
			deleted: true
		};
	}
};