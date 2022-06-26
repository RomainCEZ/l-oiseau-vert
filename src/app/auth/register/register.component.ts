import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: [null, Validators.required, Validators.email],
      username: [null, Validators.required, Validators.minLength(3), Validators.maxLength(100)],
      password: [null, Validators.required, Validators.minLength(8)],
      confirmPassword: [null, Validators.required]
    })
  }

  onRegister() {
    console.log(this.registerForm)
    if (this.registerForm.value.password === this.registerForm.value.confirmPassword) this.authService.register(this.registerForm.value)
    else throw new Error('Passwords must match !')
  }
}
