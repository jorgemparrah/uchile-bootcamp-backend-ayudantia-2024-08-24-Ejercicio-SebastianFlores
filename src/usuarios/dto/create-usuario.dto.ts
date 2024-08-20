import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({ default: 'Sebastian Flores' })
  public nombre: string; // Nombre del usuario
  @ApiProperty({ default: 'seba.flores.ram@gmail.com' })
  public correoElectronico: string; // correo electrónico del usuario, único  
  @ApiProperty({ default: '12345' })
  public contrasena: string; // contraseña del usuario
}