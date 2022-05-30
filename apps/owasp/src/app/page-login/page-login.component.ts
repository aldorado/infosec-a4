import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoggedInUser, User } from '@infosec/api-interfaces';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'infosec-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss'],
})
export class PageLoginComponent implements OnInit {

  @Output() loginEvent = new EventEmitter<LoggedInUser>()

  loginForm =  new FormGroup({
    name: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  async login() {
    if (this.loginForm.valid) {
      const { name, password } = this.loginForm.value;
      const user: User = { name, password };
      const response = await firstValueFrom(this.http.post<LoggedInUser | null>('/api/login', user));
      if (response) {
        this.loginEvent.emit(response);
      }
    }
  }
}
