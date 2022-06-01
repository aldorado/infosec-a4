import { Injectable, MiddlewareConsumer, Module, NestMiddleware, NestModule, RequestMethod } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService, CookieMiddleware } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(CookieMiddleware)
        .exclude({ path: 'login', method: RequestMethod.ALL })
        .forRoutes(AppController)
  }
}
