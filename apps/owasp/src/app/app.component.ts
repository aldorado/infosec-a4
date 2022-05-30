import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggedInUser, Message } from '@infosec/api-interfaces';

@Component({
  selector: 'infosec-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // hello$ = this.http.get<Message>('/api/hello');
  loggedIn = false;
  user: LoggedInUser | undefined;
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    const rawSession = localStorage.getItem('session');
    if (rawSession) {
      const session = JSON.parse(rawSession);
      console.log('Session found, checking ...', rawSession, session);
      const { sessionId } = session;
      this.http.post<LoggedInUser | null>('api/session', { sessionId }).subscribe(data => {
        console.log({ data });
        if (data) {
          this.login(data);
        }
      });
    }
  }

  logout() {
    this.user = undefined;
    localStorage.removeItem('session');
    this.loggedIn = false;
  }

  login(event: LoggedInUser) {
    localStorage.setItem('session', JSON.stringify(event));
    this.user = event;
    this.loggedIn = true;
  }


}
