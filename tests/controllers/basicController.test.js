import request from "supertest";

import app from "../../src/app.js";

describe('Basic Controller', () => {
    it('should return a basic response', async () => {
      const res = await request(app).get('/api/basic');
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Hello, world!');
    });
  });