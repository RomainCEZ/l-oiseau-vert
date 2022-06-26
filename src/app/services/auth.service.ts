import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginInfo } from '../core/models/LoginInfo';
import { RegisterInfo } from '../core/models/RegisterInfo';
import { UserSession } from '../core/models/UserSession';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient) { }
  isLoggedIn: boolean = false
  userSession!: UserSession

  public login(loginForm: LoginInfo): void {
    this.http.post<UserSession>('http://localhost:3000/api/auth/login', loginForm).subscribe(userInfos => this.userSession = userInfos)
    this.isLoggedIn = true
  }

  public register(registerForm: RegisterInfo) {
    this.http.post<UserSession>('http://localhost:3000/api/auth/register', registerForm).subscribe()
    this.login({ email: registerForm.email, password: registerForm.password })
  }

  public logout() {
    this.http.delete('http://localhost:3000/api/auth/register').subscribe()
    { this.isLoggedIn = false }
  }
}
