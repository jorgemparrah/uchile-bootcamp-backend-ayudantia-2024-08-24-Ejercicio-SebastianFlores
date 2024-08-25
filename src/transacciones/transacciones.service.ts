import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateTransaccioneDto } from './dto/create-transaccione.dto';
import { UpdateTransaccioneDto } from './dto/update-transaccione.dto';
import { Transaccion } from './entities/transaccione.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class TransaccionesService {
  constructor(
    @Inject(forwardRef(() => UsuariosService))
    private readonly usuariosService: UsuariosService
  ) {}

  public transacciones: Transaccion[] = []
  // public transacciones: Transaccion[] = this.usuariosService.transacciones

  // findAll(tipo?: string): Transaccion[] {
  //   let transaccionFilter: Transaccion[] = []
  //   if(tipo){
  //     transaccionFilter = 
  //       this.transacciones.filter((elemento: Transaccion) => elemento.tipo == tipo);
  //     return transaccionFilter
  //   }
  //   else{
  //     return this.transacciones
  //   }
  // }

  // findOne(id: number): Transaccion { 
  //   const transaccion = this.transacciones.find((element: Transaccion) => element.id == id);
  //   return transaccion  
  // }

  findAll(tipo?: string): Transaccion[] {
    let transaccionFilter: Transaccion[] = []
    if(tipo){
      transaccionFilter = 
        this.usuariosService.transacciones.filter((elemento: Transaccion) => elemento.tipo == tipo);
      return transaccionFilter
    }
    else{
      return this.usuariosService.transacciones
    }
  }

  findOne(id: number): Transaccion { 
    const transaccion = this.usuariosService.transacciones.find((element: Transaccion) => element.id == id);
    return transaccion  
  }
}
