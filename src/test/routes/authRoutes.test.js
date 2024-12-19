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
});
