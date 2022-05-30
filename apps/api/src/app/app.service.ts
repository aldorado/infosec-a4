import { Injectable } from '@nestjs/common';
import { LoggedInUser, Message, User } from '@infosec/api-interfaces';
import { users } from './app.constants';

@Injectable()
export class AppService {

  sessionIds: string[] = [];
  sessions: LoggedInUser[] = [];

  getData(): Message[] {
    return [
      { message: 'Welcome to api!', user: 'Peter Park' },
      { message: 'Welcome to api II!', user: 'Peter Park 2' },
      { message: 'Welcome to api III!', user: 'Peter Park' },
      { message: 'Welcome to api IV!', user: 'Peter Park 2' },
    ];
  }
  
  login(user: User): LoggedInUser | null {
    console.log('[Login]', { user });
    const foundUser = users.find(u => {
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
    this.sessions = this.sessions.filter(s => s.sessionId !== sessionId);
    console.log('[Logout]', this.sessions);
    return true;
  }

  checkSessionByUser(user: User) {
    return this.sessions.find(s => {
      return s.name === user.name;
    });
  }

  checkSessionId(sessionId) {
    const session = this.sessions.find(s => s.sessionId === sessionId)
    console.log('[checkSessionId]', sessionId, session);
    if (session) return session;
    return null;
  }

  createSessionId(): string {
    return this._randomIntFromInterval(0, 10000).toString();
  } 
  
  _randomIntFromInterval(min, max): number { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
