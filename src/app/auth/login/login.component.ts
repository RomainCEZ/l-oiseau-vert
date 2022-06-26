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

  loginForm!: FormGroup
  loginFormPreview!: Observable<{ email: string, password: string }>
  loading: boolean = false

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }


  onLogin(): void {
    this.loading = true
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        this.router.navigateByUrl("/")
        this.loading = false
      }
    )
  }

}
