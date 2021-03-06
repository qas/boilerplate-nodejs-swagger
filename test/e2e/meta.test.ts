import supertest from 'supertest';
import {app} from '../../src';

describe('Meta', () => {
  const request = supertest(app.listen());

  describe('GET /v1/spec', () => {
    it('<200> should always return API specification in swagger format',
       async () => {
         const res = await request.get('/v1/spec')
                         .expect('Content-Type', /json/)
                         .expect(200);

         const spec = res.body;
         expect(spec).toHaveProperty('info');
         expect(spec).toHaveProperty('swagger', '2.0');
         expect(spec).toHaveProperty('consumes');
         expect(spec).toHaveProperty('produces');
         expect(spec).toHaveProperty('paths');
       });
  });

  describe('GET /v1/health', () => {
    it('<200> should always return with the API server information',
       async () => {
         const res = await request.get('/v1/health')
                         .expect('Content-Type', /json/)
                         .expect(200);
         const health = res.body;
         const expected = ['name', 'version', 'description', 'author'];
         expect(Object.keys(health)).toEqual(expect.arrayContaining(expected));
       });
  });
});
