import { describe, expect } from '@jest/globals';
import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
  host: process.env.HOST_EMAIL,
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS_EMAIL,
  },
});

const verifyConection = () => new Promise((resolver, reject) => {
  transporter.verify((error, success) => {
    if (error) {
      reject(error);
    } else {
      resolver(success);
    }
  });
});

describe('Testando disparo de email', () => {
  it('O sistema deve validar se a conexão com o sistema de disparo de email', async () => {
    const estaConectado = true;
    const validarConexao = await verifyConection();
    expect(validarConexao).toStrictEqual(estaConectado);
  });

  it('O sistema deve enviar um email', async () => {
    const dadosEmailMock = {
      from: 'Fred Foo <foo@example.com>',
      to: 'teste@teste.com',
      subject: 'Teste de envio de email',
      text: 'Testando o envio de email',
    };

    const info = await transporter.sendMail(dadosEmailMock);
    expect(info.accepted[0]).toBe(dadosEmailMock.to);
  });
});
