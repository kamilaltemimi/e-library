import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {

  selectedAuthMethod = ''

  ngOnInit(): void {
  }
  
  changeAuthMethod(authMethod: string): void {
    this.selectedAuthMethod = authMethod
  }

  goBackToChooseAuthMethod(): void {
    this.selectedAuthMethod = ''
  }

}
