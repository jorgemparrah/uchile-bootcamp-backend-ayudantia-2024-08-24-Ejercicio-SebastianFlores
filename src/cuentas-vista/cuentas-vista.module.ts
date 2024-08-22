import { Module } from '@nestjs/common';
import { CuentasVistaService } from './cuentas-vista.service';
import { CuentasVistaController } from './cuentas-vista.controller';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  controllers: [CuentasVistaController],
  providers: [CuentasVistaService],
  imports: [UsuariosModule],
})
export class CuentasVistaModule {}
