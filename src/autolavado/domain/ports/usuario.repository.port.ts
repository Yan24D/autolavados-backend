import { Usuario, RolUsuario } from '../entities/usuario.entity';

export interface UsuarioRepositoryPort {
  guardar(usuario: Usuario): Promise<Usuario>;

  buscarPorId(id: string): Promise<Usuario | null>;

  buscarPorEmail(email: string): Promise<Usuario | null>;

  listarPorRol(rol: RolUsuario): Promise<Usuario[]>;

  listarActivos(): Promise<Usuario[]>;
}
