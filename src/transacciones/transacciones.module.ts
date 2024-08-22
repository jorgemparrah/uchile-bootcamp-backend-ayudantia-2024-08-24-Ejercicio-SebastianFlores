import { forwardRef, Module } from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';
import { TransaccionesController } from './transacciones.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  controllers: [TransaccionesController],
  providers: [TransaccionesService],
  exports: [TransaccionesService],
  imports: [forwardRef(() => UsuariosModule)],
})
export class TransaccionesModule {}
