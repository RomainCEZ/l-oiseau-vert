import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  urlRegex!: RegExp
  loginFormPreview!: Observable<{ email: string, password: string }>
  loading: boolean = false

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, Validators.required]
    });
  }


  onLogin(): void {
    this.loading = true
    this.authService.login(this.loginForm.value)
    this.router.navigateByUrl("/")
    this.loading = false
  }

}
