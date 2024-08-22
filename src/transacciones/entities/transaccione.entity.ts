import { ApiProperty } from '@nestjs/swagger';
import { TipoTransaccion } from './tipoTransaccion';

export class Transaccion {
    @ApiProperty()
    id: number // (identificador único de la transacción, generado automáticamente)
    @ApiProperty()
    monto: number // (monto de la transacción)
    @ApiProperty()
    tipo: TipoTransaccion // (tipo de transacción: "deposito", "retiro", "transferencia")
    @ApiProperty()
    fecha: Date // (fecha y hora de la transacción)
    @ApiProperty()
    emisor: number // id cuenta vista emisor (cuenta que realiza la transacción)
    @ApiProperty()
    receptor: number // id cuenta vista receptor (cuenta que recibe la transacción)
}