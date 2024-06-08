import request from "supertest";
import { verifyNumberEvenOdd } from "../controllers/verify.controller.js";
import app from "../app.js";

describe('GET /even-or-odd/:number',()=>{
    it('should return "Not a number" for non-numeric input', async () => {
        const response = await request(app).get('/api/even-or-odd/abc');
        expect(response.status).toBe(400);
        expect(response.text).toBe('Not a number');
      });
    
      it('should return "is even" for even number', async () => {
        const response = await request(app).get('/api/even-or-odd/4');
        expect(response.status).toBe(200);
        expect(response.text).toBe('4 is even');
      });
    
      it('should return "is odd" for odd number', async () => {
        const response = await request(app).get('/api/even-or-odd/5');
        expect(response.status).toBe(200);
        expect(response.text).toBe('5 is odd');
      });
});

describe('GET /grade/:score', () => {
    it('should return "Invalid score" for non-numeric input', async () => {
      const response = await request(app).get('/api/grade/abc');
      expect(response.status).toBe(400);
      expect(response.text).toBe('Invalid score');
    });
  
    it('should return "Invalid score" for score out of range', async () => {
      const response = await request(app).get('/api/grade/110');
      expect(response.status).toBe(400);
      expect(response.text).toBe('Invalid score');
    });
  
    it('should return "Grade A" for score >= 90', async () => {
      const response = await request(app).get('/api/grade/95');
      expect(response.status).toBe(200);
      expect(response.text).toBe('Grade A');
    });
  
    it('should return "Grade B" for score >= 80', async () => {
      const response = await request(app).get('/api/grade/85');
      expect(response.status).toBe(200);
      expect(response.text).toBe('Grade B');
    });
  
    it('should return "Grade C" for score >= 70', async () => {
      const response = await request(app).get('/api/grade/75');
      expect(response.status).toBe(200);
      expect(response.text).toBe('Grade C');
    });
  
    it('should return "Grade D" for score >= 60', async () => {
      const response = await request(app).get('/api/grade/65');
      expect(response.status).toBe(200);
      expect(response.text).toBe('Grade D');
    });
  
    it('should return "Grade F" for score < 60', async () => {
      const response = await request(app).get('/api/grade/55');
      expect(response.status).toBe(200);
      expect(response.text).toBe('Grade F');
    });
  });