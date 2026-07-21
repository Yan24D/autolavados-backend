import { Body, Controller, Post } from '@nestjs/common';
import { CrearUsuarioUseCase } from '../../application/crear-usuario.use-case';
import type { CrearUsuarioInput } from '../../application/crear-usuario.use-case';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly crearUsuario: CrearUsuarioUseCase) {}

  @Post()
  async crear(@Body() input: CrearUsuarioInput) {
    return this.crearUsuario.ejecutar(input);
  }
}
