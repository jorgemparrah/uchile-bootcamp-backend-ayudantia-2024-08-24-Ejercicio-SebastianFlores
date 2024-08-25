import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Transaccion } from 'src/transacciones/entities/transaccione.entity';
import { TransaccionesService } from 'src/transacciones/transacciones.service';
import { TipoTransaccion } from 'src/transacciones/entities/tipoTransaccion';
import { CuentasVistaService } from 'src/cuentas-vista/cuentas-vista.service';
import { CuentaVista } from 'src/cuentas-vista/entities/cuentas-vista.entity';
import { ErrorStatus } from 'src/error-status';

@Injectable()
export class UsuariosService {

  constructor(
    @Inject(forwardRef(() => CuentasVistaService))
    private readonly transaccionesService: TransaccionesService,
    private readonly cuentasVistaService: CuentasVistaService
  ) {}
  public usuarios: Usuario[] = []
  public transacciones: Transaccion[] = []

  create(createUsuarioDto: CreateUsuarioDto) {
    const usuario: Usuario = new Usuario();
    usuario.id = this.usuarios.length + 1
    usuario.nombre = createUsuarioDto.nombre;
    usuario.correoElectronico = createUsuarioDto.correoElectronico;
    usuario.contrasena = createUsuarioDto.contrasena;
    usuario.puntosAcumulados = 0;
    this.usuarios.push(usuario);
    return usuario;
  }

  findAll(nombre?: string): Usuario[] {
    if(nombre){
      const usuario: Usuario[] =  
        this.usuarios.filter((elemento: Usuario) => elemento.nombre.includes(nombre)) 
      return usuario
    }
    else{
      return this.usuarios
    }
  }

  findOne(id: number): Usuario {
    const usuario = this.usuarios.find((element: Usuario) => element.id == id);
    return usuario  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto): boolean {
    const elemento = this.usuarios.findIndex((element: Usuario) => element.id == id);
    if(elemento == -1){
      return false
    }
    else{
      this.usuarios[elemento].correoElectronico = updateUsuarioDto.correoElectronico
      this.usuarios[elemento].contrasena = updateUsuarioDto.contrasena
      return true
    }
  }

  remove(id: number): boolean {
    const elemento = this.usuarios.findIndex((element: Usuario) => element.id == id);
    if(elemento == -1){
      return false
    }
    else{
      this.usuarios.splice(elemento,1)
      return true
    }
  }

  //Verificar si existe el usuario lo puedo hacer con el FindOne en el controlador
    // (1) Primer if donde evaluo existencia de usuario
  // Verificar si tiene cuenta vista el usuario (aqui ya entre en el if true de que existe el usuario)
    // Ya tengo el usuario, puedo entrar a verificar si es que la cuenta vista datos o no y devolver el error
    // (2) aqui seria el if true o false cuenta vista usuario
  // Verificar si existe cuenta vista del receptor, aqui es la otra parte del if, 
    // aqui entre al if true del usuario
    // (3) entro a otro if en donde chequeo si el receptor tiene cuenta vista o no
  // Verificar si la cuenta vista del usuario tiene saldo suficiente para realizar la transacción, ....
  //... si no tiene el saldo suficiente debe devolver el código 500 y un mensaje de error.
    // Aqui estoy en un (1) TRUE - existe usuario, (2) TRUE - usuario tiene cuenta vista, (3) TRUE - receptor tiene cuenta vista
    // (4) Entro a a otro if, donde veo si es que el usuario tiene saldo suficiente para transferir
  // Si tiene saldo, se debe descontar el saldo de la cuenta de origen y abonar en la cuenta de destino.
    // (1,2,3,4) TRUE - ahora tiene saldo suficiente y tengo que descontar el saldo de la cuenta de origen y abonarlo en la destino
  // Debe agregar una transacción para la cuenta de origen y para la cuenta de destino.
    // 
  // Se debe cargar 5 puntos al usuario y devolver un mensaje de éxito (200).
  realizarTransferencia(    
    idUsuario: number,
    // idCuentaUsuario: number, 
    // idCuentaReceptor: number,
    idReceptor: number,
    transferencia: number ): number{
    
    let usuario = this.findOne(idUsuario);
    let receptor = this.findOne(idReceptor);
    
    // Si no existe usuario
    if(!usuario){
      return 0;
    }
    // Existe usuario
    else{
      // Si no existe cuenta vista asignada al usuario
      if(usuario.cuentaVista == undefined || !usuario.cuentaVista.habilitada){
        return 1;
      }
      // Si existe cuenta vista del usuario
      else{
        // No existe cuenta del receptor
        if(receptor.cuentaVista == undefined || !receptor.cuentaVista.habilitada){
          return 2;
        }
        //Existe cuenta del receptor
        else{
          // No hay saldo suficiente del usuario para realizar la transferencia
          if(usuario.cuentaVista.saldo < transferencia){
            return 3
          }
          // Si hay saldo suficiente para hacer la transferencia
          else{
            // Buscar los elementos del array que corresponden de ambas cuentas vista
            const elemCuentaUsuario: number = this.cuentasVistaService.cuentasVista.findIndex(
              (element: CuentaVista ) => element.id == usuario.cuentaVista.id
            )
            const elemCuentaReceptor: number = this.cuentasVistaService.cuentasVista.findIndex(
              (element: CuentaVista ) => element.id == receptor.cuentaVista.id
            )
            // Usar elementos para modificar las cuentas vista y que se reflejen en el usuario
            this.cuentasVistaService.cuentasVista[elemCuentaUsuario].saldo -= +transferencia
            this.cuentasVistaService.cuentasVista[elemCuentaReceptor].saldo += +transferencia
            // Crear dato que tendra toda la informacion de la transaccion
            let transaccion: Transaccion = new Transaccion()
            // transaccion.id = this.transaccionesService.transacciones.length + 1
            transaccion.id = this.transacciones.length + 1
            transaccion.monto = +transferencia
            transaccion.tipo = TipoTransaccion.TRANSFERENCIA
            transaccion.fecha = new Date()
            transaccion.emisor = usuario.cuentaVista.id
            transaccion.receptor = receptor.cuentaVista.id
            // Agregar transaccion en el array de transacciones
            // this.transaccionesService.transacciones.push(transaccion);
            this.transacciones.push(transaccion);
            // Registrar transaccion en cuentas vista
            this.cuentasVistaService.cuentasVista[elemCuentaUsuario].historialTransacciones.push(transaccion);
            this.cuentasVistaService.cuentasVista[elemCuentaReceptor].historialTransacciones.push(transaccion);

            // Buscar los elementos del array que corresponden a usuario
            const elemUsuario: number = this.usuarios.findIndex(
              (element: Usuario ) => element.id == idUsuario
            )
            // Sumar puntos usuario 
            this.usuarios[elemUsuario].puntosAcumulados += +5
            return 4;
          }
        }
      }
    }
  }

  abonarCuenta(idUsuario: number, abono: number){
    let usuario = this.findOne(idUsuario);
    // NO existe usuario
    if(!usuario){
      return 0;
    }
    //Si existe el usuario
    else{
      // Pero no tiene cuenta vista
      // if(!usuario.cuentaVista.habilitada || usuario.cuentaVista == undefined){
      if(usuario.cuentaVista == undefined || !usuario.cuentaVista.habilitada){
        return 1;
      }
      // cuenta vista si existe
      else{
        // encontrar elemento que corresponde del array de cuentas en base a id
        const elemCuentaUsuario: number = this.cuentasVistaService.cuentasVista.findIndex(
          (element: CuentaVista ) => element.id == usuario.cuentaVista.id)
        // abonar saldo de la cuenta
        this.cuentasVistaService.cuentasVista[elemCuentaUsuario].saldo += +abono
        // Crear dato que tendra toda la informacion del abono
        const transaccion: Transaccion = new Transaccion()
        // transaccion.id = this.transaccionesService.transacciones.length + 1
        transaccion.id = this.transacciones.length + 1
        transaccion.monto = 0
        transaccion.monto += +abono
        transaccion.tipo = TipoTransaccion.DEPOSITO
        transaccion.fecha = new Date()
        transaccion.emisor = usuario.cuentaVista.id
        transaccion.receptor = usuario.cuentaVista.id
        // Agregar transaccion en el array de transacciones
        // this.transaccionesService.transacciones.push(transaccion);
        this.transacciones.push(transaccion);
        // Registrar transaccion en cuentas vista
        this.cuentasVistaService.cuentasVista[elemCuentaUsuario].historialTransacciones.push(transaccion);
        return 2;
      }
    }

  }

  retiroCuenta(idUsuario: number, retiro: number){
    let usuario = this.findOne(idUsuario);

    // NO existe usuario
    if(!usuario){
      throw new ErrorStatus('El usuario no existe', 401)
    }

    // Pero no tiene cuenta vista
    if(usuario.cuentaVista == undefined || !usuario.cuentaVista.habilitada){
      throw new ErrorStatus('Usuario no tiene asignado una cuenta vista.', 400)
    }

    // No tiene suficiente saldo para hacer el retiro de la cuenta
    if(usuario.cuentaVista.saldo < retiro){
      throw new ErrorStatus('No hay saldo suficiente para realizar el retiro.', 400)
    }

    // encontrar elemento que corresponde del array de cuentas en base a id
    const elemCuentaUsuario: number = this.cuentasVistaService.cuentasVista.findIndex(
      (element: CuentaVista ) => element.id == usuario.cuentaVista.id)
    // retirar saldo de la cuenta
    this.cuentasVistaService.cuentasVista[elemCuentaUsuario].saldo -= +retiro
    // Crear dato que tendra toda la informacion del retiro
    const transaccion: Transaccion = new Transaccion()
    // transaccion.id = this.transaccionesService.transacciones.length + 1
    transaccion.id = this.transacciones.length + 1
    transaccion.monto = +retiro
    transaccion.tipo = TipoTransaccion.RETIRO
    transaccion.fecha = new Date()
    transaccion.emisor = usuario.cuentaVista.id
    transaccion.receptor = usuario.cuentaVista.id
    // Agregar transaccion en el array de transacciones
    // this.transaccionesService.transacciones.push(transaccion);
    this.transacciones.push(transaccion);
    // Registrar transaccion en cuentas vista
    this.cuentasVistaService.cuentasVista[elemCuentaUsuario].historialTransacciones.push(transaccion);
    return 3;

  }

  transaccionesUsuario(id: number, tipo?: string): Transaccion[] {
    let usuario = this.findOne(id);
    const elemUsuario: number = this.usuarios.findIndex(
      (element: Usuario ) => element.id == id)
    if(tipo){
      const transaccion: Transaccion[] =  
        this.usuarios[elemUsuario].cuentaVista.historialTransacciones.filter(
          (elemento: Transaccion) => elemento.tipo == tipo) 
      return transaccion
    }
    else{
      return usuario.cuentaVista.historialTransacciones;
    }
  }
}

//DUDA AQUI se asume que el ID que entregan del receptor y del usuario?