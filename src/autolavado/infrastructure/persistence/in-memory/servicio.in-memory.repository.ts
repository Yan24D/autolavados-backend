import {
  Servicio,
  TipoVehiculo,
} from '../../../domain/entities/servicio.entity';
import { ServicioRepositoryPort } from '../../../domain/ports/servicio.repository.port';

export class ServicioInMemoryRepository implements ServicioRepositoryPort {
  private servicios: Servicio[] = [];

  guardar(servicio: Servicio): Promise<Servicio> {
    this.servicios.push(servicio);
    return Promise.resolve(servicio);
  }

  buscarPorId(id: string): Promise<Servicio | null> {
    const servicio = this.servicios.find((s) => s.id === id);
    return Promise.resolve(servicio ?? null);
  }

  listarPorTipoVehiculo(tipoVehiculo: TipoVehiculo): Promise<Servicio[]> {
    const resultado = this.servicios.filter(
      (s) => s.tipoVehiculo === tipoVehiculo,
    );
    return Promise.resolve(resultado);
  }

  listarActivos(): Promise<Servicio[]> {
    const resultado = this.servicios.filter((s) => s.activo);
    return Promise.resolve(resultado);
  }

  actualizar(servicio: Servicio): Promise<Servicio> {
    const indice = this.servicios.findIndex((s) => s.id === servicio.id);
    if (indice === -1) {
      throw new Error('No se puede actualizar un servicio que no existe');
    }
    this.servicios[indice] = servicio;
    return Promise.resolve(servicio);
  }
}
