import { ConfiguracionLavadero } from '../../../domain/entities/configuracion-lavadero.entity';
import { ConfiguracionLavaderoRepositoryPort } from '../../../domain/ports/configuracion-lavadero.repository.port';

export class ConfiguracionLavaderoInMemoryRepository implements ConfiguracionLavaderoRepositoryPort {
  private configuracion: ConfiguracionLavadero | null = null;

  obtener(): Promise<ConfiguracionLavadero | null> {
    return Promise.resolve(this.configuracion);
  }

  guardar(
    configuracion: ConfiguracionLavadero,
  ): Promise<ConfiguracionLavadero> {
    this.configuracion = configuracion;
    return Promise.resolve(configuracion);
  }
}
