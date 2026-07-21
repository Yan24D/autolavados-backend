import { Module } from '@nestjs/common';
import { CrearOrdenServicioUseCase } from '../application/crear-orden-servicio.use-case';
import { ConsultarComisionesDiariasUseCase } from '../application/consultar-comisiones-diarias.use-case';
import { OrdenServicioInMemoryRepository } from './persistence/in-memory/orden-servicio.in-memory.repository';
import { UsuarioInMemoryRepository } from './persistence/in-memory/usuario.in-memory.repository';
import { ServicioInMemoryRepository } from './persistence/in-memory/servicio.in-memory.repository';
import { ConfiguracionLavaderoInMemoryRepository } from './persistence/in-memory/configuracion-lavadero.in-memory.repository';
import { OrdenServicioRepositoryPort } from '../domain/ports/orden-servicio.repository.port';
import { ServicioRepositoryPort } from '../domain/ports/servicio.repository.port';
import { UsuarioRepositoryPort } from '../domain/ports/usuario.repository.port';
import { ConfiguracionLavaderoRepositoryPort } from '../domain/ports/configuracion-lavadero.repository.port';
import { OrdenServicioController } from './http/orden-servicio.controller';
import { CrearUsuarioUseCase } from '../application/crear-usuario.use-case';
import { UsuarioController } from './http/usuario.controller';
import { CrearServicioUseCase } from '../application/crear-servicio.use-case';
import { ServicioController } from './http/servicio.controller';

export const ORDEN_SERVICIO_REPOSITORY = 'ORDEN_SERVICIO_REPOSITORY';
export const USUARIO_REPOSITORY = 'USUARIO_REPOSITORY';
export const SERVICIO_REPOSITORY = 'SERVICIO_REPOSITORY';
export const CONFIGURACION_LAVADERO_REPOSITORY =
  'CONFIGURACION_LAVADERO_REPOSITORY';

@Module({
  controllers: [OrdenServicioController, UsuarioController, ServicioController],
  providers: [
    {
      provide: ORDEN_SERVICIO_REPOSITORY,
      useClass: OrdenServicioInMemoryRepository,
    },
    {
      provide: USUARIO_REPOSITORY,
      useClass: UsuarioInMemoryRepository,
    },
    {
      provide: SERVICIO_REPOSITORY,
      useClass: ServicioInMemoryRepository,
    },
    {
      provide: CONFIGURACION_LAVADERO_REPOSITORY,
      useClass: ConfiguracionLavaderoInMemoryRepository,
    },
    {
      provide: CrearOrdenServicioUseCase,
      useFactory: (
        ordenRepo: OrdenServicioRepositoryPort,
        servicioRepo: ServicioRepositoryPort,
        usuarioRepo: UsuarioRepositoryPort,
        configRepo: ConfiguracionLavaderoRepositoryPort,
      ): CrearOrdenServicioUseCase =>
        new CrearOrdenServicioUseCase(
          ordenRepo,
          servicioRepo,
          usuarioRepo,
          configRepo,
        ),
      inject: [
        ORDEN_SERVICIO_REPOSITORY,
        SERVICIO_REPOSITORY,
        USUARIO_REPOSITORY,
        CONFIGURACION_LAVADERO_REPOSITORY,
      ],
    },
    {
      provide: ConsultarComisionesDiariasUseCase,
      useFactory: (
        ordenRepo: OrdenServicioRepositoryPort,
        usuarioRepo: UsuarioRepositoryPort,
      ): ConsultarComisionesDiariasUseCase =>
        new ConsultarComisionesDiariasUseCase(ordenRepo, usuarioRepo),
      inject: [ORDEN_SERVICIO_REPOSITORY, USUARIO_REPOSITORY],
    },
    {
      provide: CrearUsuarioUseCase,
      useFactory: (usuarioRepo: UsuarioRepositoryPort): CrearUsuarioUseCase =>
        new CrearUsuarioUseCase(usuarioRepo),
      inject: [USUARIO_REPOSITORY],
    },
    {
      provide: CrearServicioUseCase,
      useFactory: (
        servicioRepo: ServicioRepositoryPort,
      ): CrearServicioUseCase => new CrearServicioUseCase(servicioRepo),
      inject: [SERVICIO_REPOSITORY],
    },
  ],
  exports: [
    CrearOrdenServicioUseCase,
    ConsultarComisionesDiariasUseCase,
    CrearUsuarioUseCase,
    CrearServicioUseCase,
  ],
})
export class AutolavadoModule {}
