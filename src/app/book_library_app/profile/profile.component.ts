import { Component, OnInit } from '@angular/core';
import { User } from '../../core/models/user';
import { UsersService } from '../../core/services/users.service';
import { firstValueFrom, map } from 'rxjs';
import { BooksService } from '../../core/services/books.service';
import { Book } from '../../core/models/book';
import { BorrowedBook } from '../../core/models/borrowed-book';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  activeUser?: User
  borrowedBooks?: Book[]

  constructor(
    private usersService: UsersService,
    private booksService: BooksService
  ){}

  ngOnInit(): void {
    this.getActiveUser()
    this.getBorrowedBooks()
  }

  getActiveUser(): void {
    this.usersService.activeUser.pipe(map((data: User | null) => {
      if (data) {
        const date = data?.created_at?.split('T')[0]
        const newUser: User = {...data, created_at: date}
        return newUser
      } else return
    })).subscribe((data: User | undefined) => {
      this.activeUser = data
    })
  }

  getBorrowedBooks(): void {
    this.booksService.getBorrowedBooks(this.activeUser!.user_id).subscribe((books: Book[]) => {
      this.borrowedBooks = books;
      console.log(books)
    }, (error) => {
      console.error('Error fetching borrowed books:', error)
    })
  }

}
