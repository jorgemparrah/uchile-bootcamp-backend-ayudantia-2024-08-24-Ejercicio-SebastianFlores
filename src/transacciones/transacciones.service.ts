import { Injectable } from '@nestjs/common';
import { CreateTransaccioneDto } from './dto/create-transaccione.dto';
import { UpdateTransaccioneDto } from './dto/update-transaccione.dto';
import { Transaccion } from './entities/transaccione.entity';

@Injectable()
export class TransaccionesService {
  private transacciones: Transaccion[] = []

  // create(createTransaccioneDto: CreateTransaccioneDto) {
  //   return 'This action adds a new transaccione';
  // }

  findAll(tipo?: string): Transaccion[] {
    let transaccionFilter: Transaccion[] = []
    if(tipo){
      transaccionFilter = 
        this.transacciones.filter((elemento: Transaccion) => elemento.tipo == tipo);
      return transaccionFilter
    }
    else{
      return this.transacciones
    }
  }

  findOne(id: number): Transaccion { 
    const transaccion = this.transacciones.find((element: Transaccion) => element.id == id);
    return transaccion  
  }

  // update(id: number, updateTransaccioneDto: UpdateTransaccioneDto) {
  //   return `This action updates a #${id} transaccione`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} transaccione`;
  // }
}
