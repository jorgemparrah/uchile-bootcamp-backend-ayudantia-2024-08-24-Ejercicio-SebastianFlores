import { forwardRef, Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TransaccionesModule } from 'src/transacciones/transacciones.module';
import { CuentasVistaModule } from 'src/cuentas-vista/cuentas-vista.module';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
  imports: [forwardRef(() =>TransaccionesModule), forwardRef(() => CuentasVistaModule)],
})
export class UsuariosModule {}
