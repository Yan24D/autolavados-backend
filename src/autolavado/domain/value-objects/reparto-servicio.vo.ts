export class RepartoServicio {
  public readonly valorLavadero: number;
  public readonly valorLavador: number;

  constructor(
    public readonly costoTotal: number,
    public readonly porcentajeLavador: number,
  ) {
    if (costoTotal <= 0) {
      throw new Error(
        'El costo total debe ser mayor a cero para calcular el reparto',
      );
    }

    if (porcentajeLavador <= 0 || porcentajeLavador >= 100) {
      throw new Error('El porcentaje del lavador debe estar entre 0 y 100');
    }

    this.valorLavador = this.redondear(costoTotal * (porcentajeLavador / 100));
    this.valorLavadero = this.redondear(costoTotal - this.valorLavador);
  }

  private redondear(valor: number): number {
    return Math.round(valor);
  }
}
