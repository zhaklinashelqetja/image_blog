import db from '$lib/server/db.js';
import { error, fail } from '@sveltejs/kit';
import { getSession } from '$lib/server/auth.js';
 
export async function load({ params, cookies }) {
    const id = parseInt(params.id);
 
    const sessionId = cookies.get('session');
    const user = sessionId ? await getSession(sessionId) : null;
    const [images] = await db.query(
        `SELECT i.*, u.username AS author FROM images i JOIN users u ON i.author_id = u.id WHERE i.id = ?`,
        [id]);
 
    if (images.length === 0) throw error(404, 'Bild nicht gefunden');
 
    const [comments] = await db.query(
        `SELECT c.*, u.username FROM comments c JOIN users u ON c.user_id = u.id WHERE c.image_id = ? ORDER BY c.created_at ASC`,
        [id]);
 
    let hasVoted = false;
    if (user) {
        const [votes] = await db.query(
            'SELECT id FROM votes WHERE image_id = ? AND user_id = ?',
            [id, user.id]);
 
        hasVoted = votes.length > 0;
    }
 
    return {image: images[0], comments, user, hasVoted};
}
 
export const actions = {
    comment: async ({ request, params, cookies }) => {
        const sessionId = cookies.get('session');
        const user = sessionId ? await getSession(sessionId) : null;
 
        if (!user) return fail(401, { error: 'Bitte einloggen.' });
 
        const data = await request.formData();
        const text = data.get('text');
 
        if (!text || text.trim().length < 2) {
            return fail(400, { error: 'Kommentar zu kurz.' });
        }
 
        await db.query(
            'INSERT INTO comments (image_id, user_id, text) VALUES (?, ?, ?)', [params.id, user.id, text]);
        return { success: true };
    },
 
    vote: async ({ params, cookies }) => {
        const sessionId = cookies.get('session');
        const user = sessionId ? await getSession(sessionId) : null;
 
        if (!user) return fail(401, { error: 'Bitte einloggen.' });
 
        const imageId = params.id;
        const [existing] = await db.query(
            'SELECT id FROM votes WHERE image_id = ? AND user_id = ?', [imageId, user.id]);
 
        if (existing.length > 0) {
            return fail(400, { error: 'Du hast bereits gevoted.' });
        }
 
        await db.query(
            'INSERT INTO votes (image_id, user_id) VALUES (?, ?)', [imageId, user.id]);
        await db.query(
            'UPDATE images SET votes = votes + 1 WHERE id = ?', [imageId]);
 
        return { success: true };
    }
};