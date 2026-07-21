import { randomUUID } from 'crypto';
import { Servicio, TipoVehiculo } from '../domain/entities/servicio.entity';
import { ServicioRepositoryPort } from '../domain/ports/servicio.repository.port';

export interface CrearServicioInput {
  nombre: string;
  precioBase: number;
  tipoVehiculo: TipoVehiculo;
}

export class CrearServicioUseCase {
  constructor(private readonly servicioRepository: ServicioRepositoryPort) {}

  async ejecutar(input: CrearServicioInput): Promise<Servicio> {
    const servicio = new Servicio(
      randomUUID(),
      input.nombre,
      input.precioBase,
      input.tipoVehiculo,
    );

    return this.servicioRepository.guardar(servicio);
  }
}
