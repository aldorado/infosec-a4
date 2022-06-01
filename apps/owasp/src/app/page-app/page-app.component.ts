import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LoggedInUser, Message } from '@infosec/api-interfaces';
import { first, firstValueFrom } from 'rxjs';

@Component({
  selector: 'infosec-page-app',
  templateUrl: './page-app.component.html',
  styleUrls: ['./page-app.component.scss'],
})
export class PageAppComponent implements OnInit {
  @Output() logoutEvent = new EventEmitter();
  @Input() user: LoggedInUser | undefined = undefined;

  messages: Message[] = [];
  userMessages: Message[] = [];
  newMessage = '';
  constructor(private http: HttpClient, public sanitizer: DomSanitizer) {}
  ngOnInit() {
    this.getMessages();
  }

  async getMessages() {
    this.http
      .get<Message[]>('/api/messages')
      .pipe(first())
      .subscribe((data) => {
        this.messages = data;
      });

    this.http
      .get<Message[]>('/api/user-messages')
      .pipe(first())
      .subscribe((data) => {
        this.userMessages = data;
      });
  }

  async logout() {
    const response = await firstValueFrom(
      this.http.post<boolean>('/api/logout', this.user)
    );
    if (response) this.logoutEvent.emit();
  }

  async sendMessage() {
    console.log('[SendMessage]', this.newMessage);
    const response = await firstValueFrom(
      this.http.post<boolean>('/api/message', {
        message: this.newMessage,
        user: this.user?.name,
      })
    );
    if (response) this.newMessage = '';
    this.getMessages();
  }
}
