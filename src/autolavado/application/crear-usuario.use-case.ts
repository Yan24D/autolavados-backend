import { randomUUID } from 'crypto';
import { Usuario, RolUsuario } from '../domain/entities/usuario.entity';
import { UsuarioRepositoryPort } from '../domain/ports/usuario.repository.port';

export interface CrearUsuarioInput {
  nombre: string;
  email: string;
  passwordHash: string;
  rol: RolUsuario;
  telefono?: string;
}

export class CrearUsuarioUseCase {
  constructor(private readonly usuarioRepository: UsuarioRepositoryPort) {}

  async ejecutar(input: CrearUsuarioInput): Promise<Usuario> {
    const existente = await this.usuarioRepository.buscarPorEmail(input.email);
    if (existente) {
      throw new Error('Ya existe un usuario registrado con ese email');
    }

    const usuario = new Usuario(
      randomUUID(),
      input.nombre,
      input.email,
      input.passwordHash,
      input.rol,
      input.telefono,
    );

    return this.usuarioRepository.guardar(usuario);
  }
}
