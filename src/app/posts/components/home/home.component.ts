import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }
  username$!: Observable<string>
  username!: string
  ngOnInit(): void {
    this.username$ = this.authService.userSession$.pipe(
      map(userSession => userSession!.username),
      tap(username => this.username = username)
    )
  }
  textContent = "";
  // urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

  changeText(text: string) {
    this.textContent = text
  }

  onPostContent() {
    if (!this.textContent) return
    this.textContent = ""
  }

}
