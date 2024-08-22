import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { BlobOptions } from 'buffer';

@Injectable()
export class UsuariosService {

  public usuarios: Usuario[] = []

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
}
