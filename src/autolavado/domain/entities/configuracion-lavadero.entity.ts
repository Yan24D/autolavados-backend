export class ConfiguracionLavadero {
  constructor(
    public readonly id: string,
    public readonly porcentajeLavador: number,
  ) {
    if (porcentajeLavador <= 0 || porcentajeLavador >= 100) {
      throw new Error('El porcentaje del lavador debe estar entre 0 y 100');
    }
  }

  actualizarPorcentaje(nuevoPorcentaje: number): ConfiguracionLavadero {
    return new ConfiguracionLavadero(this.id, nuevoPorcentaje);
  }
}
