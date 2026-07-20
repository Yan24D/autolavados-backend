import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutolavadoModule } from './autolavado/infrastructure/autolavado.module';

@Module({
  imports: [AutolavadoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
