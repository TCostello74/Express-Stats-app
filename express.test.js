const request = require('supertest');
const app = require('./express');

describe('Statistics', function() {
    it('should calculate mean', async () => {
        const res = await request(app).get('/mean?nums=1,2,3,4,5');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('operation', 'mean');
        expect(res.body).toHaveProperty('value', 3);
    });

    it('should calculate median', async () => {
        const res = await request(app).get('/median?nums=1,2,3,4,5');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('operation', 'median');
        expect(res.body).toHaveProperty('value', 3);
    });

    it('should calculate mode', async () => {
        const res = await request(app).get('/mode?nums=1,2,2,3,4,5');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('operation', 'mode');
        expect(res.body).toHaveProperty('value', expect.arrayContaining([2]));
    });
});
