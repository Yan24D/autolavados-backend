export enum RolUsuario {
  ADMIN = 'ADMIN',
  SECRETARIO = 'SECRETARIO',
  LAVADOR = 'LAVADOR',
}

export class Usuario {
  constructor(
    public readonly id: string,
    public readonly nombre: string,
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly rol: RolUsuario,
    public readonly telefono?: string,
    public readonly activo: boolean = true,
  ) {
    if (!this.esEmailValido(email)) {
      throw new Error('El email proporcionado no es válido');
    }
  }

  private esEmailValido(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  esLavador(): boolean {
    return this.rol === RolUsuario.LAVADOR;
  }

  esSecretario(): boolean {
    return this.rol === RolUsuario.SECRETARIO;
  }

  esAdmin(): boolean {
    return this.rol === RolUsuario.ADMIN;
  }
}
