import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto {
    @ApiProperty()
    public correoElectronico: string; // correo electrónico del usuario, único  
    @ApiProperty()
    public contrasena: string; // contraseña del usuario
  }