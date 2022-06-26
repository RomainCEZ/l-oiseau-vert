import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  username = "Romain"
  textContent = "";

  changeText(text: string) {
    this.textContent = text
  }

  postTextContent(e: SubmitEvent) {
    e.preventDefault()
    if (!this.textContent) return
    this.textContent = ""
  }

}
