import { ApiProperty } from '@nestjs/swagger';
import { CuentaVista } from 'src/cuentas-vista/entities/cuentas-vista.entity';

export class Usuario {
  @ApiProperty()
  public id: number; // identificador numérico único, generado automáticamente (Incremental, debe comenzar en 1)
  @ApiProperty()
  public nombre: string; // Nombre del usuario
  @ApiProperty()
  public correoElectronico: string; // correo electrónico del usuario, único  
  @ApiProperty()
  public contrasena: string; // contraseña del usuario
  @ApiProperty()
  public puntosAcumulados: number; // (número de puntos de recompensa acumulados)
  @ApiProperty()
  public cuentaVista: CuentaVista; // cuenta vista del usuario
}