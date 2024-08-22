import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CuentasVistaModule } from './cuentas-vista/cuentas-vista.module';
import { TransaccionesModule } from './transacciones/transacciones.module';

@Module({
  imports: [UsuariosModule, CuentasVistaModule, TransaccionesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
