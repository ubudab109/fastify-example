import app from '../src/app';
import { describe, expect, test } from '@jest/globals';

describe('Auth endpoints', () => {
  test('Register user', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/auth/register',
      payload: { email: 'test@example.com', password: '123456' }
    });
    expect(res.statusCode).toBe(200);
  });
});
