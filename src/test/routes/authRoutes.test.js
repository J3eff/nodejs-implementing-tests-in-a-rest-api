import request from 'supertest';
import { afterEach, beforeEach, describe } from '@jest/globals';
import app from '../../app';

let server;
beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('Testando a rota login (POST)', () => {
  // Teste de caixa presta
  test('O login deve possuir um email e senha para se autenticar', async () => {
    const loginMock = { email: 'jeff@teste.com.br' };

    await request(server)
      .post('/login')
      .send(loginMock)
      .expect(500)
      .expect('"A senha de usuario é obrigatório."');
  });

  test('O login deve validar se o usuário está cadastrado', async () => {
    const mock = { email: 'jeff@teste.com.br', senha: '123456' };

    await request(server)
      .post('/login')
      .send(mock)
      .expect(500)
      .expect('"Usuario não cadastrado."');
  });

  test('O logint deve validar e-mail e senha incorreto', async () => {
    const mock = { email: 'raphael@teste.com.br', senha: '1234567' };

    await request(server)
      .post('/login')
      .set('Accept', 'application/json')
      .send(mock)
      .expect(500)
      .expect('"Usuario ou senha invalido."');
  });

  test('O login deve validar se está sendo retornado um accessToken', async () => {
    const mock = { email: 'raphael@teste.com.br', senha: '123456' };

    const response = await request(server)
      .post('/login')
      .set('Accept', 'application/json')
      .send(mock)
      .expect(201);

    expect(response.body).toHaveProperty('accessToken');
  });
});
