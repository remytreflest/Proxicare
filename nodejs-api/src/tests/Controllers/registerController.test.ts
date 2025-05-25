import request from 'supertest';
import app from '@/app';
import { User } from '@/models/User';
import Patient from '@/models/Patient';
import { SpecialityEnum } from '@/resources/emuns/speciality';
import HealthcareProfessional from '@/models/HealthcareProfessional';

jest.mock('@/models/User');
jest.mock('@/models/Patient');
jest.mock('@/models/HealthcareProfessional');

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
        .send(mockUser);
  
      expect(res.statusCode).toBe(400);
    });
  
    it('should return 409 if user id already exist', async () => {
  
      (User.findOne as jest.Mock).mockResolvedValue({ id: "123"});
  
      const res = await request(app)
        .post('/api/register/user')
        .send(mockUser);
  
      expect(res.statusCode).toBe(409);
    });
  
    it('should return 409 if user email already exist', async () => {
  
      (User.findOne as jest.Mock)
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({ id: '123' });  
  
      const res = await request(app)
        .post('/api/register/user')
        .send(mockUser);
  
      expect(res.statusCode).toBe(409);
    });
  
    it('should return 500', async () => {
  
      (User.findOne as jest.Mock).mockRejectedValue(new Error('DB uncatchable'));  
  
      const res = await request(app)
        .post('/api/register/user')
        .send(mockUser);
  
      expect(res.statusCode).toBe(500);
    });

  });

  describe('POST /register/patient', () => {

    const mockSave = jest.fn();
    const mockPatient = {
        userId: '123',
        birthday: '1991/06/18',
        gender: 'M',
        address: '100 avenue de château',
        socialSecurityNumber: '12345678912345',
        save: mockSave
    }

    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return 201 if patient is created', async () => {
  
      (User.findByPk as jest.Mock).mockResolvedValue(mockPatient);
      (Patient.create as jest.Mock).mockResolvedValue(mockPatient);
      (Patient.findOne as jest.Mock).mockResolvedValue(null);
  
      const res = await request(app)
        .post('/api/register/patient')
        .send(mockPatient);
  
      expect(res.statusCode).toBe(201);
    });
  
    it('should return 400 if params left', async () => {
      let mockPatient = {
        userId: '123',
        birthday: '1991/06/18',
        gender: 'M',
        address: '100 avenue de château',
      }

      const res = await request(app)
        .post('/api/register/patient')
        .send(mockPatient);
  
      expect(res.statusCode).toBe(400);
    });
  
    it('should return 404 if user doesn\'t exist', async () => {
  
      (User.findByPk as jest.Mock).mockResolvedValue(null);
  
      const res = await request(app)
        .post('/api/register/patient')
        .send(mockPatient);
  
      expect(res.statusCode).toBe(404);
    });
  
    it('should return 409 if patient with social security number already exist', async () => {
  
      (User.findByPk as jest.Mock).mockResolvedValue({ id: "123" });
      (Patient.findOne as jest.Mock).mockResolvedValue({ id: '456' });  
  
      const res = await request(app)
        .post('/api/register/patient')
        .send(mockPatient);
  
      expect(res.statusCode).toBe(409);
    });
  
    it('should return 500', async () => {
  
      (User.findByPk as jest.Mock).mockRejectedValue(new Error('DB uncatchable'));  
  
      const res = await request(app)
        .post('/api/register/patient')
        .send(mockPatient);
  
      expect(res.statusCode).toBe(500);
    });

  });

  describe('POST /register/caregiver', () => {

    const mockSave = jest.fn();
    const mockCaregiver = {
        speciality: SpecialityEnum.NURSE,
        structureId: 1,
        idn: '123456',
        save: mockSave
    }

    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return 201 if caregiver is created', async () => {
  
      (User.findByPk as jest.Mock).mockResolvedValue(mockCaregiver);
      (HealthcareProfessional.findOne as jest.Mock).mockResolvedValue(null);
      (HealthcareProfessional.create as jest.Mock).mockResolvedValue(mockCaregiver);
  
      const res = await request(app)
        .post('/api/register/caregiver')
        .send(mockCaregiver);
  
      expect(res.statusCode).toBe(201);
    });
  
    it('should return 400 if params left', async () => {
      let mockCaregiver = {
        userId: '123',
      }

      const res = await request(app)
        .post('/api/register/caregiver')
        .send(mockCaregiver);
  
      expect(res.statusCode).toBe(400);
    });

    it('should return 400 if enum isn\'t valid', async () => {
      let mockCaregiver = {
        userId: '123',
        speciality: 'untrucfaux'
      }

      const res = await request(app)
        .post('/api/register/caregiver')
        .send(mockCaregiver);
  
      expect(res.statusCode).toBe(400);
    });
  
    it('should return 404 if user doesn\'t exist', async () => {
  
      (User.findByPk as jest.Mock).mockResolvedValue(null);
  
      const res = await request(app)
        .post('/api/register/caregiver')
        .send(mockCaregiver);
  
      expect(res.statusCode).toBe(404);
    });
  
    it('should return 409 if caregiver with userId already exist', async () => {
  
      (User.findByPk as jest.Mock).mockResolvedValue({ id: "123" });
      (HealthcareProfessional.findOne as jest.Mock).mockResolvedValue({ id: '456' });  
  
      const res = await request(app)
        .post('/api/register/caregiver')
        .send(mockCaregiver);
  
      expect(res.statusCode).toBe(409);
    });
  
    it('should return 500', async () => {
  
      (User.findByPk as jest.Mock).mockRejectedValue(new Error('DB uncatchable'));  
  
      const res = await request(app)
        .post('/api/register/caregiver')
        .send(mockCaregiver);
  
      expect(res.statusCode).toBe(500);
    });

  });

});
