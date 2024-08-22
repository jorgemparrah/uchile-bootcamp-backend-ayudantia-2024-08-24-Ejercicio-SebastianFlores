import { ApiProperty } from '@nestjs/swagger';
import { Transaccion } from 'src/transacciones/entities/transaccione.entity';


export class CuentaVista {
    @ApiProperty()
    public id: number; // (identificador único de la cuenta, generado automáticamente)
    @ApiProperty()
    public idUsuario: number; // id del Usuario (id del usuario al que pertenece la cuenta)
    @ApiProperty()
    public saldo: number; // Number (saldo de la cuenta, inicialmente 0) no puede tener saldo negativo
    @ApiProperty()
    public historialTransacciones: Transaccion[]; // array<Transaccion> (registro de todas las transacciones realizadas en la cuenta)
    @ApiProperty()
    public habilitada: boolean; 
  }
