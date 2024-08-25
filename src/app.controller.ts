import { Body, Controller, Get, Post, Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('hello')
  getHello2(@Body() ejemplo: any, @Response() response) {
    if (!ejemplo) {
      response.status(400).send('No se envio el objeto de entrada');
    }
    const resultado = this.appService.prueba(ejemplo);
    response.status(201).send(resultado);
  }

}
