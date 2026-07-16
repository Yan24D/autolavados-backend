import { OrdenServicio } from '../entities/orden-servicio.entity';

export interface OrdenServicioRepositoryPort {
  guardar(orden: OrdenServicio): Promise<OrdenServicio>;

  buscarPorId(id: string): Promise<OrdenServicio | null>;

  listarPorLavadorYFecha(
    lavadorId: string,
    fecha: Date,
  ): Promise<OrdenServicio[]>;

  listarPorFecha(fecha: Date): Promise<OrdenServicio[]>;

  contarOrdenesDelDia(fecha: Date): Promise<number>;
}
