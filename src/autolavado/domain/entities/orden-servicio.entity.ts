import { RepartoServicio } from '../value-objects/reparto-servicio.vo';

export enum EstadoPago {
  PENDIENTE = 'PENDIENTE',
  EFECTIVO = 'EFECTIVO',
  DIGITAL = 'DIGITAL',
}

export class OrdenServicio {
  public readonly reparto: RepartoServicio;

  constructor(
    public readonly id: string,
    public readonly consecutivo: number,
    public readonly fecha: Date,
    public readonly horaEntrada: string,
    public readonly vehiculoMarca: string,
    public readonly vehiculoColor: string,
    public readonly placa: string | null,
    public readonly servicioId: string,
    public readonly costoServicio: number,
    public readonly porcentajeLavador: number,
    public readonly lavadorId: string,
    public readonly secretarioId: string,
    public readonly estadoPago: EstadoPago = EstadoPago.PENDIENTE,
    public readonly metodoPago?: string,
    public readonly telefonoCliente?: string,
    public readonly observaciones?: string,
  ) {
    this.reparto = new RepartoServicio(costoServicio, porcentajeLavador);
  }
}
