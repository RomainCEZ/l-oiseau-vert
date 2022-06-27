import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, delay, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading$!: Observable<boolean>
  loginForm!: FormGroup

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initObservables()
    this.initForm()
  }

  private initObservables() {
    this.loading$ = this.authService.loading$
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

}
