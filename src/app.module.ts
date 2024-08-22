import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CuentasVistaModule } from './cuentas-vista/cuentas-vista.module';

@Module({
  imports: [UsuariosModule, CuentasVistaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
