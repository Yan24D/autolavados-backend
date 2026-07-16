import { OrdenServicio } from '../../../domain/entities/orden-servicio.entity';
import { OrdenServicioRepositoryPort } from '../../../domain/ports/orden-servicio.repository.port';

export class OrdenServicioInMemoryRepository implements OrdenServicioRepositoryPort {
  private ordenes: OrdenServicio[] = [];

  guardar(orden: OrdenServicio): Promise<OrdenServicio> {
    this.ordenes.push(orden);
    return Promise.resolve(orden);
  }

  buscarPorId(id: string): Promise<OrdenServicio | null> {
    const orden = this.ordenes.find((o) => o.id === id);
    return Promise.resolve(orden ?? null);
  }

  listarPorLavadorYFecha(
    lavadorId: string,
    fecha: Date,
  ): Promise<OrdenServicio[]> {
    const resultado = this.ordenes.filter(
      (o) => o.lavadorId === lavadorId && this.esMismoDia(o.fecha, fecha),
    );
    return Promise.resolve(resultado);
  }

  listarPorFecha(fecha: Date): Promise<OrdenServicio[]> {
    const resultado = this.ordenes.filter((o) =>
      this.esMismoDia(o.fecha, fecha),
    );
    return Promise.resolve(resultado);
  }

  contarOrdenesDelDia(fecha: Date): Promise<number> {
    const total = this.ordenes.filter((o) =>
      this.esMismoDia(o.fecha, fecha),
    ).length;
    return Promise.resolve(total);
  }

  private esMismoDia(fechaA: Date, fechaB: Date): boolean {
    return (
      fechaA.getFullYear() === fechaB.getFullYear() &&
      fechaA.getMonth() === fechaB.getMonth() &&
      fechaA.getDate() === fechaB.getDate()
    );
  }
}
