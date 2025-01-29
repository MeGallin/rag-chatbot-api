import request from 'supertest';
import app from '../src/server';

describe('POST /chat', () => {
  it('should return a response from the chatbot', async () => {
    const res = await request(app).post('/chat').send({ query: 'Hello' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('response');
  });
});
