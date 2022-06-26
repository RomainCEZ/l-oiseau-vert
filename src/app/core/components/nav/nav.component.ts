import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLogout() {
    this.authService.logout().subscribe(
      () => this.router.navigateByUrl("/login")
    )
  }

}
