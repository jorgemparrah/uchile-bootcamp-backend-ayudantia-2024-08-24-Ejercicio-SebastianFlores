import { forwardRef, Module } from '@nestjs/common';
import { CuentasVistaService } from './cuentas-vista.service';
import { CuentasVistaController } from './cuentas-vista.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  controllers: [CuentasVistaController],
  providers: [CuentasVistaService],
  imports: [forwardRef(() => UsuariosModule)],
  exports: [CuentasVistaService],
})
export class CuentasVistaModule {}
