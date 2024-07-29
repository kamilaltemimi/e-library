import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'

import { User } from '../../core/models/user';

import { UsersService } from '../../core/services/users.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  isActiveUser = false;
  toggleMenu = false;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeUser();
  }

  initializeUser() {
    this.usersService.activeUser.subscribe((data: User | null) => {
      data ? this.isActiveUser = true : this.isActiveUser = false;
    });
  }

  onToggleMenu(): void {
    this.toggleMenu = !this.toggleMenu;
  }

  navigate(route: string): void {
    this.router.navigate([route]);
    this.toggleMenu = false;
  }

  logout(): void {
    this.usersService.activeUser.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['']);
    this.toggleMenu = false;
  }
}