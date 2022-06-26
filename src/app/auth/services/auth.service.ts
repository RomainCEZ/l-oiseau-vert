import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap, Observable, BehaviorSubject, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginInfo } from '../../core/models/LoginInfo';
import { RegisterInfo } from '../../core/models/RegisterInfo';
import { UserSession } from '../../core/models/UserSession';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subject = new BehaviorSubject<UserSession | null>(null);

  userSession$: Observable<UserSession | null> = this.subject.asObservable()
  isLoggedIn$!: Observable<boolean>
  isLoggedIn: boolean = false

  constructor(private http: HttpClient, private router: Router) {
    this.isLoggedIn$ = this.userSession$.pipe(
      map(userSession => userSession !== null),
    )
  }

  public login(loginForm: LoginInfo): Observable<UserSession> {
    return this.http.post<UserSession>(`${environment.apiUrl}auth/login`, loginForm).pipe(
      tap(userInfos => this.subject.next(userInfos)),
      tap(() => this.isLoggedIn = true),
      tap(() => this.router.navigateByUrl("/"))
    )

  }

  public register(registerForm: RegisterInfo) {
    return this.http.post<UserSession>(`${environment.apiUrl}auth/register`, registerForm).pipe(
      map(() => true),
      catchError(() => of(false)),
      tap(success => success ? this.login({ email: registerForm.email, password: registerForm.password }).subscribe() : success)
    )
  }

  public logout(): Observable<UserSession> {
    return this.http.delete<UserSession>(`${environment.apiUrl}auth/logout`).pipe(
      tap(() => this.subject.next(null)),
      tap(() => this.isLoggedIn = false),
    )
  }
}
