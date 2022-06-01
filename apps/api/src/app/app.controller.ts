import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Response,
} from '@nestjs/common';

import { LoggedInUser, Message, User } from '@infosec/api-interfaces';

import { AppService } from './app.service';
import { userInfo } from 'os';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('messages')
  getData(): Message[] {
    return this.appService.getData();
  }

  @Get('user-messages')
  getUserData(
    @Body() sessionRequest: { sessionId: string },
    @Req() request
  ): Message[] {
    return this.appService.getUserData(request.cookies['sessionId']);
  }

  @Post('message')
  postData(@Body() data: Message, @Req() request): Message {
    const sessionId = request.cookies['sessionId'];
    return this.appService.postData(data, sessionId);
  }

  @Post('login')
  login(
    @Body() user: User,
    @Res({ passthrough: true }) response
  ): LoggedInUser | null {
    const session = this.appService.login(user);
    response.cookie('sessionId', session.sessionId);
    return session;
  }

  @Post('logout')
  logout(@Body() user: User, @Req() request): boolean | null {
    const sessionId = request.cookies['sessionId'];
    return this.appService.logout(sessionId);
  }

  @Post('session')
  session(
    @Body() sessionRequest: { sessionId: string },
    @Req() request
  ): LoggedInUser | null {
    // const { sessionId } = sessionRequest;
    const sessionId = request.cookies['sessionId'];
    return this.appService.checkSessionId(sessionId);
  }
}
