import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateCuentasVistaDto } from './dto/create-cuentas-vista.dto';
import { UpdateCuentasVistaDto } from './dto/update-cuentas-vista.dto';
import { CuentaVista } from './entities/cuentas-vista.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class CuentasVistaService {
  constructor(
    @Inject(forwardRef(() => UsuariosService))
    private readonly usuariosService: UsuariosService) {}
  public cuentasVista: CuentaVista[] = []

  create(createCuentasVistaDto: CreateCuentasVistaDto) {
    const cuentaVista: CuentaVista = new CuentaVista();
    cuentaVista.id = this.cuentasVista.length + 1
    cuentaVista.idUsuario = createCuentasVistaDto.idUsuario
    cuentaVista.saldo = 0
    cuentaVista.historialTransacciones = []
    cuentaVista.habilitada = createCuentasVistaDto.habilitada
    this.cuentasVista.push(cuentaVista);

    const elemento = this.usuariosService.usuarios.findIndex((element: Usuario) => element.id == createCuentasVistaDto.idUsuario);
    this.usuariosService.usuarios[elemento].cuentaVista = cuentaVista
    return cuentaVista
  }

  findAll(habilitado? : boolean): CuentaVista[] {
    let cuentaVistaFilter: CuentaVista[] = []

    if(habilitado != undefined){
      cuentaVistaFilter =  
        this.cuentasVista.filter((elemento: CuentaVista) => elemento.habilitada == habilitado) 
      return cuentaVistaFilter
    }
    else{
      return this.cuentasVista
    }
  }

  findOne(id: number): CuentaVista {
    const cuentaVista = this.cuentasVista.find((element: CuentaVista) => element.id == id);
    return cuentaVista  
  }

  update(id: number, habilitada: boolean): boolean {
    const elemento: number = this.cuentasVista.findIndex(
      (element: CuentaVista) => element.id == id);

    if(elemento == -1){
      return false
    }
    else{
      this.cuentasVista[elemento].habilitada = habilitada
      return true
    }
  }

  remove(id: number): boolean {
    const elemento: number = this.cuentasVista.findIndex((element: CuentaVista) => element.id == id);
    if(elemento == -1){
      return false
    }
    else{
      const elemUsuario: number = this.usuariosService.usuarios.findIndex(
        (element: Usuario) => element.id == this.cuentasVista[elemento].idUsuario
      )
      this.cuentasVista.splice(elemento,1)
      this.usuariosService.usuarios.splice(elemUsuario,1)
      return true
    }
  }
}
