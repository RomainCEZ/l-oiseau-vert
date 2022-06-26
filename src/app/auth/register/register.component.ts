import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

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
      email: ['', Validators.required, Validators.email],
      username: ['', Validators.required, Validators.minLength(3), Validators.maxLength(100)],
      password: ['', Validators.required, Validators.minLength(3)],
      confirmPassword: ['', Validators.required]
    })
  }

  onRegister() {
    try {
      if (this.registerForm.value.password === this.registerForm.value.confirmPassword) this.authService.register(this.registerForm.value).subscribe()

    } catch (error) {
      console.log(error)
    }
  }
}
