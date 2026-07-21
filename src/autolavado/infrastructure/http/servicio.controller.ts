import { Body, Controller, Post } from '@nestjs/common';
import { CrearServicioUseCase } from '../../application/crear-servicio.use-case';
import type { CrearServicioInput } from '../../application/crear-servicio.use-case';

@Controller('servicios')
export class ServicioController {
  constructor(private readonly crearServicio: CrearServicioUseCase) {}

  @Post()
  async crear(@Body() input: CrearServicioInput) {
    return this.crearServicio.ejecutar(input);
  }
}
