import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('car')
  helloworld(): string {
    return 'HELLO THIS IS CAR';
  }

  @Get('notfound')
  @HttpCode(404)
  notFound(): string {
    return 'This is a 404 page';
  }

  @Get('cat/:id')
  getCatById(@Param('id') id: string): string {
    return 'Now we show cat with id: ' + id;
  }
}

@Controller({ host: 'admin.example.com' })
export class AdminController {
  @Get('admin')
  index(): string {
    return 'Admin page';
  }
}
