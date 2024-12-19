import { describe, expect } from '@jest/globals';
import AuthService from '../../services/authService';

const authService = new AuthService();

describe('Testando a authService.cadastrarUsuario', () => {
  it('O usuario deve poassuir um nome, email e senha', async () => {
    // Padrão triple A (Arrange, Act, Assert)
    // arrange
    const usuarioMock = { nome: 'Jefferson', email: 'jeff@teste.com.br' };
    // act
    const usuarioSalvo = authService.cadastrarUsuario(usuarioMock);
    // assert
    await expect(usuarioSalvo).rejects.toThrowError('A senha do usuario é obrigatório.');
  });
});
