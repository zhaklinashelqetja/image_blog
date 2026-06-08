import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/server/db';
import { verifyPassword, createSession } from '$lib/server/auth';

export const actions = {
  login: async ({ request, cookies }) => {
    const formData = await request.formData();
    const username = formData.get('username');
    const password = formData.get('password');

    console.log('1. USERNAME:', username);

    const [rows] = await pool.execute(
      'SELECT id, username, password FROM users WHERE username = ?',
      [username]
    );

    console.log('2. USER:', rows[0]);

    const user = rows[0];
    if (!user) return fail(401, { error: 'Invalid username or password' });

    const validPassword = await verifyPassword(password, user.password);
    console.log('3. VALID PASSWORD:', validPassword);

    if (!validPassword) return fail(401, { error: 'Invalid username or password' });

    const sessionId = await createSession(user.id);
    console.log('4. SESSION ID:', sessionId);

    cookies.set('session', sessionId, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 60 * 60 * 24 * 30
    });

    console.log('5. COOKIE SET, REDIRECTING');
    throw redirect(303, '/dashboard');
  }
};