import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, Put, ParseBoolPipe } from '@nestjs/common';
import { CuentasVistaService } from './cuentas-vista.service';
import { CreateCuentasVistaDto } from './dto/create-cuentas-vista.dto';
import { UpdateCuentasVistaDto } from './dto/update-cuentas-vista.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Response } from 'express';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CuentaVista } from './entities/cuentas-vista.entity';

@Controller('cuentas-vista')
export class CuentasVistaController {
  constructor(private readonly cuentasVistaService: CuentasVistaService,
    private readonly usuariosService: UsuariosService
  ) {}

  @ApiResponse({ status: 404, description: 'Este codigo se debe a que no encuentra el id del usuario.' })
  @Post()
  create(@Body() createCuentasVistaDto: CreateCuentasVistaDto, @Res() response: Response): void {
    const usuario = this.usuariosService.findOne(createCuentasVistaDto.idUsuario);
    if(usuario){
      this.cuentasVistaService.create(createCuentasVistaDto);
      response.status(200).send();
    }
    else{
      response.status(404).send('No existe usuario con el id ingresado.');
    }
  }

  @ApiQuery({ name: 'habilitada', required: false})
  @Get()
  findAll(@Res() response: Response,
  @Query('habilitada', new ParseBoolPipe({optional: true})) habilitado?: boolean): void {
    const cuentaVista: CuentaVista[] = this.cuentasVistaService.findAll(habilitado);
    response.status(200).send(cuentaVista)
  }

  @ApiResponse({ status: 200, description: 'Este codigo se debe a que se pudo enviar la cuenta vista en base al id ingresado.' })
  @ApiResponse({ status: 404, description: 'Este codigo se debe a que no encuentra el id de la cuenta vista' })
  @Get(':id')
  findOne(@Param('id') id: number, @Res() response: Response): void {
    const cuentaVista = this.cuentasVistaService.findOne(id);
    if(cuentaVista){
      response.status(200).send(cuentaVista);
    }
    else{
      response.status(404).send('No existe cuenta vista con el id ingresado.');
    }
  }

  @ApiResponse({ status: 200, description: 'Este codigo se debe a que se pudo modificar la cuenta vista en base al id ingresado de manera correcta.' })
  @ApiResponse({ status: 404, description: 'Este codigo se debe a que no encuentra el id de la cuenta vista' })
  @ApiQuery({ name: 'habilitada', required: true})
  @Put(':id')
  update(@Param('id') id: number, 
    @Query('habilitada', new ParseBoolPipe({optional: true})) habilitada: boolean,
    @Res() response: Response): void {

    const chequeo: boolean = this.cuentasVistaService.update(id, habilitada);
    if(chequeo){
      response.status(200).send();
    }
    else{
      response.status(404).send('No existe cuenta vista con el id ingresado.');
    }
  }
  

  @ApiResponse({ status: 200, description: 'Este codigo se debe a que se pudo eliminar la cuenta vista en base al id ingresado de manera correcta.' })
  @ApiResponse({ status: 404, description: 'Este codigo se debe a que no encuentra el id de la cuenta vista.' })
  @Delete(':id')
  remove(@Param('id') id: number,
  @Res() response: Response): void {
    const eliminarCuenta: boolean = this.cuentasVistaService.remove(id);
    if(eliminarCuenta){
      response.status(200).send();
    }
    else{
      response.status(404).send('No existe cuenta vista con el id ingresado.');
    }
  }
}
