import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { LoggedInUser, Message, User } from '@infosec/api-interfaces';
import { users, messages as defaultMessages } from './app.constants';

@Injectable()
export class AuthService {
  sessions: LoggedInUser[] = [];
}

@Injectable()
export class AppService {
  sessions: LoggedInUser[] = [];
  messages = defaultMessages;

  /*
._____ _____ _____ _____ _____ _____ _____ _____ 
|     |   __|   __|   __|  _  |   __|   __|   __|
| | | |   __|__   |__   |     |  |  |   __|__   |
|_|_|_|_____|_____|_____|__|__|_____|_____|_____|
*/
  getData(): Message[] {
    return this.messages;
  }

  getUserData(sessionId: string): Message[] {
    const session = this.checkSessionId(sessionId);
    if (session) {
      return this.messages.filter((m) => m.user === session.name);
    }
    return [];
  }

  postData(data: Message, sessionId: string): Message {
    const session = this.checkSessionId(sessionId);
    if (session) {
      this.messages.unshift({ message: data.message, user: session.name });
      return data;
    }
    return null;
  }

  /*
._____ _____ _____ _____ 
|  _  |  |  |_   _|  |  |
|     |  |  | | | |     |
|__|__|_____| |_| |__|__|
*/

  login(user: User): LoggedInUser | null {
    console.log('[Login]', { user });
    const foundUser = users.find((u) => {
      return u.name === user.name && u.password == user.password;
    });

    if (foundUser) {
      console.log(this.sessions);
      const runningSession = this.checkSessionByUser(user);

      if (runningSession) {
        return runningSession;
      }

      let sessionId = this.createSessionId();
      while (this.checkSessionId(sessionId)) {
        sessionId = this.createSessionId();
      }
      const newSession = { name: user.name, sessionId };
      this.sessions.push(newSession);
      return newSession;
    }

    return null;
  }

  logout(sessionId: string): boolean {
    console.log('[Logout]', { sessionId });
    this.sessions = this.sessions.filter((s) => s.sessionId !== sessionId);
    console.log('[Logout]', this.sessions);
    return true;
  }

  checkSessionByUser(user: User) {
    return this.sessions.find((s) => {
      return s.name === user.name;
    });
  }

  checkSessionId(sessionId) {
    const session = this.sessions.find((s) => s.sessionId === sessionId);
    console.log('[checkSessionId]', sessionId, session);
    if (session) return session;
    return null;
  }

  createSessionId(): string {
    return this._randomIntFromInterval(0, 10000).toString();
  }

  _randomIntFromInterval(min, max): number {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

@Injectable()
export class CookieMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const sessionId = req.cookies['sessionId'];
    const origin = req.get('origin');
    const host = req.get('host');
    if (origin && origin !== 'http://localhost:4200') {
      res.status(500).send('Error');
    }
    console.log('[CookieMiddleware]', sessionId);
    console.log('[CookieMiddleware]', { host, origin });
    req.cookies;
    next();
  }
}
