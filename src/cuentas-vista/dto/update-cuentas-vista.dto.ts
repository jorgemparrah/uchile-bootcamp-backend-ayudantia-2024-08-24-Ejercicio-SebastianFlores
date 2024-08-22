import { PartialType } from '@nestjs/swagger';
import { CreateCuentasVistaDto } from './create-cuentas-vista.dto';

export class UpdateCuentasVistaDto extends PartialType(CreateCuentasVistaDto) {}
