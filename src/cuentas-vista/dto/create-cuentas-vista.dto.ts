import { ApiProperty } from '@nestjs/swagger';

export class CreateCuentasVistaDto {
    @ApiProperty({ default: 1 })
    public idUsuario: number; // id del Usuario (id del usuario al que pertenece la cuenta)
    @ApiProperty({ default: true })
    public habilitada: boolean; 
}