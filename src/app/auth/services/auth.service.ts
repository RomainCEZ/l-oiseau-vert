import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap, BehaviorSubject, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginInfo } from '../../core/models/LoginInfo';
import { RegisterInfo } from '../../core/models/RegisterInfo';
import { UserSession } from '../../core/models/UserSession';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  error: any;

  constructor(private http: HttpClient, private router: Router) { }

  private _userSession$ = new BehaviorSubject<UserSession>({ userId: '', username: '' });
  get userSession$() {
    return this._userSession$.asObservable()
  }

  private _loading$ = new BehaviorSubject<boolean>(false)
  get loading$() {
    return this._loading$.asObservable()
  }

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false)
  get isLoggedIn$() {
    return this._isLoggedIn$.asObservable()
  }
  isLoggedIn: boolean = false

  private _httpError$ = new BehaviorSubject<string>('')
  get httpError$() {
    return this._httpError$.asObservable()
  }

  private setLoadingStatus(loading: boolean) {
    this._loading$.next(loading)
  }

  private setIsLoggedIn(loggedIn: boolean) {
    this.isLoggedIn = loggedIn
    this._isLoggedIn$.next(loggedIn)
  }

  public login(loginForm: LoginInfo): void {
    this.setLoadingStatus(true)
    this.http.post<UserSession>(`${environment.apiUrl}auth/login`, loginForm).pipe(
      tap(userInfos => {
        this._userSession$.next(userInfos)
        this.setIsLoggedIn(true)
        this.setLoadingStatus(false)
        this.router.navigateByUrl("/")
      }),
      catchError(error => {
        this._httpError$.next(error.status)
        return error
      })
    ).subscribe()
  }

  public relog(): void {
    this.http.get<UserSession>(`${environment.apiUrl}auth/`).pipe(
      tap(userInfos => {
        this._userSession$.next(userInfos)
        this.setIsLoggedIn(true)
        this.router.navigateByUrl("/")
      })
    ).subscribe()
  }

  public register(registerForm: RegisterInfo): void {
    this.http.post<UserSession>(`${environment.apiUrl}auth/register`, registerForm).pipe(
      map(() => true),
      tap(success => success ? this.login({ email: registerForm.email, password: registerForm.password }) : success),
      catchError(error => {
        this._httpError$.next(error.error.message)
        return error
      })
    ).subscribe()
  }

  public logout(): void {
    this.http.delete<UserSession>(`${environment.apiUrl}auth/logout`).pipe(
      tap(() => {
        this._userSession$.next({ userId: '', username: '' })
        this.setIsLoggedIn(false)
        this.router.navigateByUrl("/login")
      })
    ).subscribe()
  }
}
