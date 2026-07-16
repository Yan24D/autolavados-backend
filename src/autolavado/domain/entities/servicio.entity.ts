export enum TipoVehiculo {
  MOTO = 'MOTO',
  AUTOMOVIL = 'AUTOMOVIL',
  CAMIONETA = 'CAMIONETA',
  EXCEPCION = 'EXCEPCION',
}

export class Servicio {
  constructor(
    public readonly id: string,
    public readonly nombre: string,
    public readonly precioBase: number,
    public readonly tipoVehiculo: TipoVehiculo,
    public readonly activo: boolean = true,
  ) {
    if (precioBase <= 0) {
      throw new Error('El precio base del servicio debe ser mayor a cero');
    }
  }
}
