import app from '../../app';
import request from 'supertest';
import HealthcareAct from "@/models/HealthcareAct";
import { HealthcareProfessionalHealthcareAct } from '@/models/HealthcareProfessionalHealthcareAct';
import HealthcareProfessional from '@/models/HealthcareProfessional';


jest.mock('@/models/HealthcareAct');
jest.mock('@/models/HealthcareProfessionalHealthcareAct');
jest.mock('@/models/HealthcareProfessional');

describe('Healthcare Controller', () => {

    const mockData = [
        {
            id: '1',
            name: 'un nom',
            description: '', 
            price: 1,
            createdAt: ''
        },
        {
            id: '2',
            name: 'un nom',
            description: '', 
            price: 1,
            createdAt: ''
        }
    ];

    describe('GET /healthcare/acts', () => {

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return 200 with some act', async () => {
        
            (HealthcareAct.findAll as jest.Mock).mockResolvedValue(mockData);
        
            const res = await request(app)
                .get('/api/healthcare/acts')
                .set('x-userId', '123');
        
            expect(res.statusCode).toBe(200);
        });

        it('should return 500', async () => {
        
            (HealthcareAct.findAll as jest.Mock).mockRejectedValue(new Error('DB uncatchable')); 
        
            const res = await request(app)
                .get('/api/healthcare/acts')
                .set('x-userId', '123');
        
            expect(res.statusCode).toBe(500);
        });

    });

    describe('POST /healthcare/act', () => {

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return 201', async () => {

            const mockedAct = {
                id: '1',
                name: 'un nom',
                description: '', 
                price: 1,
                createdAt: ''
            };
        
            (HealthcareAct.findOne as jest.Mock).mockResolvedValue(null);
            (HealthcareAct.create as jest.Mock).mockResolvedValue(mockedAct);

            const res = await request(app)
                .post('/api/healthcare/act')
                .set('x-userId', '123')
                .send(mockedAct);
        
            expect(res.statusCode).toBe(201);
        });

        it('should return 400 name null', async () => {

            const mockedAct = {
                id: '1',
                name: null,
                description: '', 
                price: 1,
                createdAt: ''
            };

            const res = await request(app)
                .post('/api/healthcare/act')
                .set('x-userId', '123')
                .send(mockedAct);
        
            expect(res.statusCode).toBe(400);
        });

        it('should return 400 name empty', async () => {

            const mockedAct = {
                id: '1',
                name: '',
                description: '', 
                price: 1,
                createdAt: ''
            };

            const res = await request(app)
                .post('/api/healthcare/act')
                .set('x-userId', '123')
                .send(mockedAct);
        
            expect(res.statusCode).toBe(400);
        });

        it('should return 409', async () => {

            const mockedAct = {
                id: '1',
                name: 'un nom',
                description: '', 
                price: 1,
                createdAt: ''
            };
        
            (HealthcareAct.findOne as jest.Mock).mockResolvedValue({});

            const res = await request(app)
                .post('/api/healthcare/act')
                .set('x-userId', '123')
                .send(mockedAct);
        
            expect(res.statusCode).toBe(409);
        });

        it('should return 500', async () => {

            const mockedAct = {
                id: '1',
                name: 'un nom',
                description: '', 
                price: 1,
                createdAt: ''
            };
        
            (HealthcareAct.findOne as jest.Mock).mockRejectedValue(new Error('DB uncatchable')); 

            const res = await request(app)
                .post('/api/healthcare/act')
                .set('x-userId', '123')
                .send(mockedAct);
        
            expect(res.statusCode).toBe(500);
        });

    });

    describe('POST /healthcare/act/caregiver', () => {

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return 201', async () => {

            const mockedLinkActCaregiver = {
                healthcareProfessionalId: '1',
                healthcareActId: '2'
            };
        
            (HealthcareProfessional.findOne as jest.Mock).mockResolvedValue({});
            (HealthcareAct.findOne as jest.Mock).mockResolvedValue({});
            (HealthcareProfessionalHealthcareAct.create as jest.Mock).mockResolvedValue(mockedLinkActCaregiver);

            const res = await request(app)
                .post('/api/healthcare/act/caregiver')
                .set('x-userId', '123')
                .send(mockedLinkActCaregiver);
        
            expect(res.statusCode).toBe(201);
        });

        it('should return 400 healthcareProfessionalId missing', async () => {

            const mockedLinkActCaregiver = {
                healthcareProfessionalId: '1'
            };

            const res = await request(app)
                .post('/api/healthcare/act/caregiver')
                .set('x-userId', '123')
                .send(mockedLinkActCaregiver);
        
            expect(res.statusCode).toBe(400);
        });

        it('should return 400 healthcareActId missing', async () => {

            const mockedLinkActCaregiver = {
                healthcareActId: '1'
            };

            const res = await request(app)
                .post('/api/healthcare/act/caregiver')
                .set('x-userId', '123')
                .send(mockedLinkActCaregiver);
        
            expect(res.statusCode).toBe(400);
        });

        it('should return 404 HealthcareProfessional doesn\'t exist', async () => {

            const mockedLinkActCaregiver = {
                healthcareProfessionalId: '1',
                healthcareActId: '2'
            };
        
            (HealthcareProfessional.findOne as jest.Mock).mockResolvedValue(null);

            const res = await request(app)
                .post('/api/healthcare/act/caregiver')
                .set('x-userId', '123')
                .send(mockedLinkActCaregiver);
        
            expect(res.statusCode).toBe(404);
        });

        it('should return 404 HealthcareAct doesn\'t exist', async () => {

            const mockedLinkActCaregiver = {
                healthcareProfessionalId: '1',
                healthcareActId: '2'
            };
        
            (HealthcareProfessional.findOne as jest.Mock).mockResolvedValue({});
            (HealthcareAct.findOne as jest.Mock).mockResolvedValue(null);

            const res = await request(app)
                .post('/api/healthcare/act/caregiver')
                .set('x-userId', '123')
                .send(mockedLinkActCaregiver);
        
            expect(res.statusCode).toBe(404);
        });

        it('should return 500', async () => {

            const mockedLinkActCaregiver = {
                healthcareProfessionalId: '1',
                healthcareActId: '2'
            };
        
            (HealthcareProfessional.findOne as jest.Mock).mockRejectedValue(new Error('DB uncatchable'));

            const res = await request(app)
                .post('/api/healthcare/act/caregiver')
                .set('x-userId', '123')
                .send(mockedLinkActCaregiver);
        
            expect(res.statusCode).toBe(500);
        });

    });
});