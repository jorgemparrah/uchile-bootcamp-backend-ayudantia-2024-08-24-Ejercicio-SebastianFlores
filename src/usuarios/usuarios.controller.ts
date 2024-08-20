import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, Put } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Response } from 'express';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Usuario } from './entities/usuario.entity';



@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @ApiQuery({ name: 'nombre', required: false})
  @Get()
  findAll(@Res() response: Response,
  @Query('nombre') nombre?: string): void {
    const usuarios: Usuario[] = this.usuariosService.findAll(nombre);
    response.status(200).send(usuarios)
  }

  @ApiResponse({ status: 200, description: 'Este codigo se debe a que se pudo enviar el usuario en base al id ingresado.' })
  @ApiResponse({ status: 404, description: 'Este codigo se debe a que no encuentra el id del usuario' })
  @Get(':id')
  findOne(@Param('id') id: number, @Res() response: Response): void {
    const usuario = this.usuariosService.findOne(id);
    if(usuario){
      response.status(200).send(usuario)
    }
    else{
      response.status(404).send('No existe usuario con el id ingresado.')
    }
  }

  @ApiResponse({ status: 200, description: 'Este codigo se debe a que se pudo modificar el correo y contraseña del usuario en base al id ingresado de manera correcta.' })
  @ApiResponse({ status: 404, description: 'Este codigo se debe a que no encuentra el id del usuario ingresado.' })
  @Put(':id')
  update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto,@Res() response: Response): void {
    const chequeo = this.usuariosService.update(id,updateUsuarioDto);
    if(!chequeo){
      response.status(404).send('No existe usuario con el id ingresado.')
    }
    else{
      response.status(200).send()
    }
  }

  @ApiResponse({ status: 200, description: 'Este codigo se debe a que se pudo eliminar el usuario en base al id ingresado de manera correcta.' })
  @ApiResponse({ status: 404, description: 'Este codigo se debe a que no encuentra el id del usuario ingresado.' })
  @Delete(':id')
  remove(@Param('id') id: number, @Res() response: Response): void {
    const modif: boolean = this.usuariosService.remove(id);
    if(!modif){
      response.status(404).send('No existe usuario con el id ingresado.')
    }
    else{ 
      response.status(200).send()
    }
  }
}
