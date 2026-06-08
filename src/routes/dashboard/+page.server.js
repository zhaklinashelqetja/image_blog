import { fail, redirect } from '@sveltejs/kit';
import { put, del } from '@vercel/blob';
import pool from '$lib/server/db';

export async function load({ locals }) {
	if (!locals.user) throw redirect(303, '/login');
	const [images] = await pool.execute(
		'SELECT * FROM images WHERE author_id = ? ORDER BY created_at DESC',
		[locals.user.id]);

	return { user: locals.user, images };
}

export const actions = {
	upload: async ({ request, locals }) => {
		if (!locals.user) throw redirect(303, '/login');

		const fd = await request.formData();
		const file = fd.get('image');
		const description = fd.get('description') || '';

		if (!file?.size) return fail(400, { error: 'Select image.' });
		if (!file.type.startsWith('image/')) return fail(400, { error: 'Only images.' });

		const blob = await put(file.name, file, { access: 'public' });
		await pool.execute(
			'INSERT INTO images (image, description, author_id) VALUES (?, ?, ?)',
			[blob.url, description, locals.user.id]
		);
		return { success: true };
	},

	delete: async ({ request, locals }) => {
		if (!locals.user) throw redirect(303, '/login');

		const { imageId } = Object.fromEntries(await request.formData());
		const [rows] = await pool.execute(
			'SELECT * FROM images WHERE id = ? AND author_id = ?',
			[imageId, locals.user.id]
		);

		if (!rows.length) return fail(403, { error: 'Not found.' });
		await del(rows[0].image);
		await pool.execute('DELETE FROM images WHERE id = ?', [imageId]);
		return { deleted: true };
	}
};