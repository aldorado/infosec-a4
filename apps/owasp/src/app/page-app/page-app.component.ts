import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoggedInUser, Message } from '@infosec/api-interfaces';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'infosec-page-app',
  templateUrl: './page-app.component.html',
  styleUrls: ['./page-app.component.scss'],
})
export class PageAppComponent implements OnInit {
  @Output() logoutEvent = new EventEmitter();
  @Input() user: LoggedInUser | undefined = undefined;
  
  messages: Message[] = [];
  constructor(private http: HttpClient) {}
  

  ngOnInit() {
    this.http.get<Message[]>('/api/messages').subscribe(data => {
      this.messages = data;
    });
  };

  
  async logout() {
    const response = await firstValueFrom(this.http.post<boolean>('/api/logout', this.user));
    if (response)
      this.logoutEvent.emit();
  }
}
