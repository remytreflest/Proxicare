import request from 'supertest';
import app from '../../app';

jest.mock('@/models/User', () => ({
  User: class {
    static create = jest.fn().mockResolvedValue({
        id: '123456789',
        email: 'rt@outlook.com',
        firstName: 'remy',
        lastName: 'treflest',
    });
    static findOne = jest.fn().mockResolvedValue(null);
  }
}));

describe('POST /api/register/patient', () => {

  it('should return 201 if user is created', async () => {
    const res = await request(app)
      .post('/api/register/user')
      .set('x-userId', '123')
      .send({
            id: '123456789',
            email: 'rt@outlook.com',
            firstName: 'remy',
            lastName: 'treflest',
        });

    expect(res.statusCode).toBe(201);
  });

  it('should return 400 left params', async () => {
    const res = await request(app)
      .post('/api/register/user')
      .set('x-userId', '123')
      .send({
            id: '123456789',
            email: 'rt@outlook.com',
            firstName: 'remy',
        });

    expect(res.statusCode).toBe(400);
  });

});
