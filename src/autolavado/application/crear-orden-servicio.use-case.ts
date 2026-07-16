import { randomUUID } from 'crypto';
import {
  OrdenServicio,
  EstadoPago,
} from '../domain/entities/orden-servicio.entity';
import { OrdenServicioRepositoryPort } from '../domain/ports/orden-servicio.repository.port';
import { ServicioRepositoryPort } from '../domain/ports/servicio.repository.port';
import { UsuarioRepositoryPort } from '../domain/ports/usuario.repository.port';
import { ConfiguracionLavaderoRepositoryPort } from '../domain/ports/configuracion-lavadero.repository.port';

export interface CrearOrdenServicioInput {
  vehiculoMarca: string;
  vehiculoColor: string;
  placa: string | null;
  servicioId: string;
  lavadorId: string;
  secretarioId: string;
  horaEntrada: string;
  metodoPago?: string;
  telefonoCliente?: string;
  observaciones?: string;
}

const PORCENTAJE_LAVADOR_POR_DEFECTO = 50;

export class CrearOrdenServicioUseCase {
  constructor(
    private readonly ordenServicioRepository: OrdenServicioRepositoryPort,
    private readonly servicioRepository: ServicioRepositoryPort,
    private readonly usuarioRepository: UsuarioRepositoryPort,
    private readonly configuracionRepository: ConfiguracionLavaderoRepositoryPort,
  ) {}

  async ejecutar(input: CrearOrdenServicioInput): Promise<OrdenServicio> {
    const servicio = await this.servicioRepository.buscarPorId(
      input.servicioId,
    );
    if (!servicio || !servicio.activo) {
      throw new Error('El servicio seleccionado no existe o no está activo');
    }

    const lavador = await this.usuarioRepository.buscarPorId(input.lavadorId);
    if (!lavador || !lavador.esLavador() || !lavador.activo) {
      throw new Error('El lavador seleccionado no existe o no está activo');
    }

    const secretario = await this.usuarioRepository.buscarPorId(
      input.secretarioId,
    );
    if (!secretario || !secretario.esSecretario()) {
      throw new Error('El secretario que registra la orden no es válido');
    }

    const configuracion = await this.configuracionRepository.obtener();
    const porcentajeLavador =
      configuracion?.porcentajeLavador ?? PORCENTAJE_LAVADOR_POR_DEFECTO;

    const fecha = new Date();
    const totalDelDia =
      await this.ordenServicioRepository.contarOrdenesDelDia(fecha);
    const consecutivo = totalDelDia + 1;

    const orden = new OrdenServicio(
      randomUUID(),
      consecutivo,
      fecha,
      input.horaEntrada,
      input.vehiculoMarca,
      input.vehiculoColor,
      input.placa,
      servicio.id,
      servicio.precioBase,
      porcentajeLavador,
      lavador.id,
      secretario.id,
      EstadoPago.PENDIENTE,
      input.metodoPago,
      input.telefonoCliente,
      input.observaciones,
    );

    return this.ordenServicioRepository.guardar(orden);
  }
}
