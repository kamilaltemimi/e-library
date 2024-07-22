import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './shared/header/header.component'
import { UsersService } from './core/services/users.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(
    private usersService: UsersService
  ) {}
  
  ngOnInit(): void {
    const userData = localStorage.getItem('userData')
    const parsedData = userData ? JSON.parse(userData) : null
    this.usersService.activeUser.next(parsedData)
  }

}
