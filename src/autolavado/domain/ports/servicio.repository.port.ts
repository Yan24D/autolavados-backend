import { Servicio, TipoVehiculo } from '../entities/servicio.entity';

export interface ServicioRepositoryPort {
  guardar(servicio: Servicio): Promise<Servicio>;

  buscarPorId(id: string): Promise<Servicio | null>;

  listarPorTipoVehiculo(tipoVehiculo: TipoVehiculo): Promise<Servicio[]>;

  listarActivos(): Promise<Servicio[]>;

  actualizar(servicio: Servicio): Promise<Servicio>;
}
