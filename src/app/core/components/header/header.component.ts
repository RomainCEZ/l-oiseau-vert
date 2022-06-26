import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService) { }

  isLoggedIn$!: Observable<boolean>

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$
  }


}
