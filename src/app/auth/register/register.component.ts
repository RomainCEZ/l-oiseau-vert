import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  loading$!: Observable<boolean>
  errorMessage$!: Observable<any>
  registerForm!: FormGroup

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
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required]]
    })

  }

  onRegister() {
    if (this.registerForm.value.password === this.registerForm.value.confirmPassword) this.authService.register(this.registerForm.value)
  }

  relog(): void {
    this.authService.relog()
  }

  handleError(errorMessage: string): string {
    console.log(errorMessage)
    if (!errorMessage) return ''
    if (errorMessage === "Email already registered") return "Cet email déjà enregistré !"
    if (errorMessage === "Username already registered") return "Ce nom d'utilisateur est déjà enregistré !"
    return errorMessage
  }

}
