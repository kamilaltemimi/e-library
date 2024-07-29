import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../core/models/user';

@Component({
  selector: 'app-book-library-homepage',
  standalone: false,
  templateUrl: './book-library-homepage.component.html',
  styleUrl: './book-library-homepage.component.scss'
})
export class BookLibraryHomepageComponent implements OnInit {

  activeUser: User | null = null

  constructor(
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.usersService.activeUser.subscribe((data: User | null) => this.activeUser = data)
  }
}
