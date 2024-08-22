import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, Put, ParseBoolPipe } from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';
import { CreateTransaccioneDto } from './dto/create-transaccione.dto';
import { UpdateTransaccioneDto } from './dto/update-transaccione.dto';
import { Response } from 'express';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { TipoTransaccion } from './entities/tipoTransaccion';
import { Transaccion } from './entities/transaccione.entity';

@Controller('transacciones')
export class TransaccionesController {
  constructor(private readonly transaccionesService: TransaccionesService) {}

  // @Post()
  // create(@Body() createTransaccioneDto: CreateTransaccioneDto) {
  //   return this.transaccionesService.create(createTransaccioneDto);
  // }

  @ApiQuery({ name: 'tipo', enum: TipoTransaccion, required: false})
  @Get()
  findAll(@Res() response: Response,
  @Query('tipo') tipo?: string): void  {
    const transaccionFilter: Transaccion[] = this.transaccionesService.findAll(tipo);
    response.status(200).send(transaccionFilter)
  }

  @ApiResponse({ status: 200, description: 'Este codigo se debe a que se pudo encontrar la transaccion en base al id ingresado de manera correcta.' })
  @ApiResponse({ status: 404, description: 'Este codigo se debe a que no encuentra el id de la transaccion.' })
  @Get(':id')
  findOne(@Param('id') id: number, @Res() response: Response): void {
    const transaccion = this.transaccionesService.findOne(id);
    if(transaccion){
      response.status(200).send(transaccion);
    }
    else{
      response.status(404).send('No existe transaccion con el id ingresado.');
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTransaccioneDto: UpdateTransaccioneDto) {
  //   return this.transaccionesService.update(+id, updateTransaccioneDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.transaccionesService.remove(+id);
  // }
}
