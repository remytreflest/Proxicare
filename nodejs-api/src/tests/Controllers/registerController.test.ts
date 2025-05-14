import request from 'supertest';
import app from '../../app';
import { User } from '@/models/User';

jest.mock('@/models/User');

describe('Register Controller', () => {
  
  describe('POST /register/user', () => {

    const mockUser = {
        id: '123456789',
        email: 'rt@outlook.com',
        firstName: 'remy',
        lastName: 'treflest',
    }

    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return 201 if user is created', async () => {
  
      (User.create as jest.Mock).mockResolvedValue(mockUser);
  
      const res = await request(app)
        .post('/api/register/user')
        .set('x-userId', '123')
        .send(mockUser);
  
      expect(res.statusCode).toBe(201);
    });
  
    it('should return 400 if params left', async () => {
      let mockUser = {
        id: '123456789',
        email: 'rt@outlook.com',
        lastName: 'treflest',
      }

      const res = await request(app)
        .post('/api/register/user')
        .set('x-userId', '123')
        .send(mockUser);
  
      expect(res.statusCode).toBe(400);
    });
  
    it('should return 409 if user id already exist', async () => {
  
      (User.findOne as jest.Mock).mockResolvedValue({ id: "123"});
  
      const res = await request(app)
        .post('/api/register/user')
        .set('x-userId', '123')
        .send(mockUser);
  
      expect(res.statusCode).toBe(409);
    });
  
    it('should return 409 if user email already exist', async () => {
  
      (User.findOne as jest.Mock)
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({ id: '123' });  
  
      const res = await request(app)
        .post('/api/register/user')
        .set('x-userId', '123')
        .send(mockUser);
  
      expect(res.statusCode).toBe(409);
    });
  
    it('should return 500', async () => {
  
      (User.findOne as jest.Mock).mockRejectedValue(new Error('DB uncatchable'));  
  
      const res = await request(app)
        .post('/api/register/user')
        .set('x-userId', '123')
        .send(mockUser);
  
      expect(res.statusCode).toBe(500);
    });

  });

});
