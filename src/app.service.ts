import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  prueba(ejemplo): string {
    return this.prueba2();
  }

  prueba2(): string {
    return this.prueba3();
  }

  prueba3(): string {
    try {
      return this.prueba4();
    } catch(error) {
      console.log("TENGO UN ERROR DE PRUEBA 4");
      const newError = new Error('Error manejado en prueba3');
      throw newError;
    }
    return 'Hello Prueba3';
  }

  prueba4(): string {
    const ejemplo2 = null;
    const tipo = ejemplo2[0];
    return 'Hello Prueba4';
  }

}
