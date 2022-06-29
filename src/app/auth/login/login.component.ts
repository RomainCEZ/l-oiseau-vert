import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading$!: Observable<boolean>
  errorMessage$!: Observable<string>
  loginForm!: FormGroup

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initObservables()
    this.initForm()
    this.relog()
  }

  private initObservables() {
    this.loading$ = this.authService.loading$
    this.errorMessage$ = this.authService.httpError$.pipe(
      map(errorCode => {
        return this.handleError(errorCode.toString())
      }))
  }

  private initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    this.authService.login(this.loginForm.value)
  }

  relog(): void {
    this.authService.relog()
  }

  handleError(errorCode: string): string {
    if (!errorCode) return ''
    if (errorCode === '401') return 'Email ou mot de passe invalide !'
    return 'Une erreur est survenue !'
  }

}
