import request from 'supertest';

import app from '../../app';
import { Todos } from './todos.model';

beforeAll(async () => {
  try {
    await Todos.drop();
  } catch (error) {}
});

describe('GET /api/v1/todos', () => {
  it('responds with a json message', async () =>
    request(app)
      .get('/api/v1/todos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(0);
      }));
});

let id = '';

describe('POST /api/v1/todos', () => {
  it('responds with an error if the todo is invalid', async () =>
    request(app)
      .post('/api/v1/todos')
      .set('Accept', 'application/json')
      .send({
        content: '',
      })
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      }));

  it('responds with an inserted object', async () =>
    request(app)
      .post('/api/v1/todos')
      .set('Accept', 'application/json')
      .send({
        content: 'Learn Typescript',
        done: false,
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('content');
        expect(response.body.content).toBe('Learn Typescript');
        expect(response.body).toHaveProperty('done');
        expect(response.body.done).toBe(false);
        id = response.body._id;
      }));
});

describe('GET /api/v1/todos/:id', () => {
  it('responds with a single todo', async () =>
    request(app)
      .get(`/api/v1/todos/${id}`)
      .set('Accept', 'application/json')
      .send({
        content: 'Learn Typescript',
        done: false,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('content');
        expect(response.body.content).toBe('Learn Typescript');
        expect(response.body).toHaveProperty('done');
        expect(response.body.done).toBe(false);
        id = response.body._id;
      }));
});

describe('PUT /api/v1/todos/:id', () => {
  it('responds with an Invalid ObjectId error for update Todo', async () =>
    request(app)
      .put('/api/v1/todos/invalidId')
      .set('Accept', 'application/json')
      .send({
        content: 'Learn Typescript',
        done: true,
      })
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      }));

  it('responds with an updated single todo', async () =>
    request(app)
      .put(`/api/v1/todos/${id}`)
      .set('Accept', 'application/json')
      .send({
        content: 'Learn Typescript',
        done: true,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('content');
        expect(response.body.content).toBe('Learn Typescript');
        expect(response.body).toHaveProperty('done');
        expect(response.body.done).toBe(true);
      }));
});

describe('DELETE /api/v1/todos/:id', () => {
  it('responds with a successfully Delete message', async () =>
    request(app)
      .delete(`/api/v1/todos/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      }));

  it('responds with an error for delete non existing Todo', async () => {
    request(app)
      .delete(`/api/v1/todos/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      });
  });

  it('responds with an Invalid ObjectId error for delete Todo', async () =>
    request(app)
      .delete('/api/v1/todos/invalidId')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      }));
});

describe('GET /api/v1/todos/:id', () => {
  it('responds with an Invalid ObjectId error for single Todo', async () =>
    request(app)
      .get('/api/v1/todos/invalidId')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      }));

  it('responds with an not found error for single Todo', async () =>
    request(app)
      .get(`/api/v1/todos/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      }));
});
