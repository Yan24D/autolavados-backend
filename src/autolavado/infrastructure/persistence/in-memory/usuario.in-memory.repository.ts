import { Usuario, RolUsuario } from '../../../domain/entities/usuario.entity';
import { UsuarioRepositoryPort } from '../../../domain/ports/usuario.repository.port';

export class UsuarioInMemoryRepository implements UsuarioRepositoryPort {
  private usuarios: Usuario[] = [];

  guardar(usuario: Usuario): Promise<Usuario> {
    this.usuarios.push(usuario);
    return Promise.resolve(usuario);
  }

  buscarPorId(id: string): Promise<Usuario | null> {
    const usuario = this.usuarios.find((u) => u.id === id);
    return Promise.resolve(usuario ?? null);
  }

  buscarPorEmail(email: string): Promise<Usuario | null> {
    const usuario = this.usuarios.find((u) => u.email === email);
    return Promise.resolve(usuario ?? null);
  }

  listarPorRol(rol: RolUsuario): Promise<Usuario[]> {
    const resultado = this.usuarios.filter((u) => u.rol === rol);
    return Promise.resolve(resultado);
  }

  listarActivos(): Promise<Usuario[]> {
    const resultado = this.usuarios.filter((u) => u.activo);
    return Promise.resolve(resultado);
  }
}
