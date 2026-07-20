import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { CrearOrdenServicioUseCase } from '../../application/crear-orden-servicio.use-case';
import { ConsultarComisionesDiariasUseCase } from '../../application/consultar-comisiones-diarias.use-case';
import type { CrearOrdenServicioInput } from '../../application/crear-orden-servicio.use-case';

@Controller('ordenes')
export class OrdenServicioController {
  constructor(
    private readonly crearOrdenServicio: CrearOrdenServicioUseCase,
    private readonly consultarComisionesDiarias: ConsultarComisionesDiariasUseCase,
  ) {}

  @Post()
  async crear(@Body() input: CrearOrdenServicioInput) {
    return this.crearOrdenServicio.ejecutar(input);
  }

  @Get('comisiones')
  async comisiones(
    @Query('lavadorId') lavadorId: string,
    @Query('fecha') fecha: string,
  ) {
    return this.consultarComisionesDiarias.ejecutar(lavadorId, new Date(fecha));
  }
}
