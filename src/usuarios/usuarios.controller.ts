import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, Put } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { query, Response } from 'express';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Usuario } from './entities/usuario.entity';
import { TipoTransaccion } from 'src/transacciones/entities/tipoTransaccion';



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

  // @Post(':idUsuario/transferencia/:idCuentaUsuario/:idCuentaReceptor')
  @ApiQuery({ name: 'transferencia', required: true})
  @Post('transferencia/:idUsuario/:idReceptor')
  realizarTransferencia(
    @Param('idUsuario') idUsuario: number,
    @Param('idReceptor') idReceptor: number,
    // @Param('idCuentaUsuario') idCuentaUsuario: number, 
    // @Param('idCuentaReceptor') idCuentaReceptor: number, 
    @Query('transferencia') transferencia: number,
    @Res() response: Response): void{
    
    const transferir: number = this.usuariosService.realizarTransferencia(idUsuario,idReceptor,transferencia);
    if(transferir == 0){
      response.status(404).send('No existe usuario con el id ingresado.')
    }
    else if(transferir == 1){
      response.status(400).send('Usuario no tiene asignado una cuenta vista.')
    }
    else if(transferir == 2){
      response.status(400).send('Receptor no tiene asignado una cuenta vista.')
    }
    else if(transferir == 3){
      response.status(500).send('No hay saldo suficiente para realizar una transferencia.')
    }
    else if(transferir == 4){
      response.status(200).send('Transferencia realizada correctamente.')
    }
  }

  // @Post('abono/:idUsuario')
  // abonarCuenta(
    //   @Param('idUsuario') idUsuario: number,
    //   @Query('abono') monto: number,
    //   @Res() response: Response): void{
  // @ApiQuery({ name: 'monto'})
  @Post(':idUsuario/abono/:monto')
  abonarCuenta(
    @Param('idUsuario') idUsuario: number,
    @Param('monto') monto: number,
    @Res() response: Response): void{
    
    const abonar: number = this.usuariosService.abonarCuenta(idUsuario,monto);
    if(abonar == 0){
      response.status(404).send('No existe usuario con el id ingresado.')
    }
    else if(abonar == 1){
      response.status(400).send('Usuario no tiene asignado una cuenta vista.')
    }
    else if(abonar == 2){
      response.status(200).send('Abono realizado de manera exitosa.')
    }
  }

  @Post(':idUsuario/retiro/:monto')
  retirarCuenta(
    @Param('idUsuario') idUsuario: number,
    @Param('monto') monto: number,
    @Res() response: Response): void{
    
    const retirar: number = this.usuariosService.retiroCuenta(idUsuario,monto);
    if(retirar == 0){
      response.status(404).send('No existe usuario con el id ingresado.')
    }
    else if(retirar == 1){
      response.status(400).send('Usuario no tiene asignado una cuenta vista.')
    }
    else if(retirar == 2){
      response.status(500).send('No hay saldo suficiente para realizar el retiro.')
    }
    else if(retirar == 3){
      response.status(200).send('Retiro realizado de manera exitosa.')
    }
  }

  @ApiQuery({ name: 'tipo', enum: TipoTransaccion, required: false})
  @Get('transacciones/:id')
  transaccionesUsuario(@Res() response: Response,
  @Param('id') id: number,
  @Query('tipo') tipo?: string): void {
    response.status(200).send(this.usuariosService.transaccionesUsuario(id,tipo))
  }
}
