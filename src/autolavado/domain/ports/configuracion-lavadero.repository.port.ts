import { ConfiguracionLavadero } from '../entities/configuracion-lavadero.entity';

export interface ConfiguracionLavaderoRepositoryPort {
  obtener(): Promise<ConfiguracionLavadero | null>;

  guardar(configuracion: ConfiguracionLavadero): Promise<ConfiguracionLavadero>;
}
