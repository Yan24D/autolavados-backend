import { OrdenServicioRepositoryPort } from '../domain/ports/orden-servicio.repository.port';
import { UsuarioRepositoryPort } from '../domain/ports/usuario.repository.port';

export interface ComisionesDiariasOutput {
  lavadorId: string;
  lavadorNombre: string;
  fecha: Date;
  totalOrdenes: number;
  totalComisiones: number;
}

export class ConsultarComisionesDiariasUseCase {
  constructor(
    private readonly ordenServicioRepository: OrdenServicioRepositoryPort,
    private readonly usuarioRepository: UsuarioRepositoryPort,
  ) {}

  async ejecutar(
    lavadorId: string,
    fecha: Date,
  ): Promise<ComisionesDiariasOutput> {
    const lavador = await this.usuarioRepository.buscarPorId(lavadorId);
    if (!lavador || !lavador.esLavador()) {
      throw new Error('El lavador solicitado no existe');
    }

    const ordenes = await this.ordenServicioRepository.listarPorLavadorYFecha(
      lavadorId,
      fecha,
    );

    const totalComisiones = ordenes.reduce(
      (acumulado, orden) => acumulado + orden.reparto.valorLavador,
      0,
    );

    return {
      lavadorId: lavador.id,
      lavadorNombre: lavador.nombre,
      fecha,
      totalOrdenes: ordenes.length,
      totalComisiones,
    };
  }
}
