import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../core/models/user';
import { UsersService } from '../../core/services/users.service';
import { map } from 'rxjs';
import { BooksService } from '../../core/services/books.service';
import { Book } from '../../core/models/book';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  activeUser?: User
  borrowedBooks?: Book[]
  isActiveModal = false

  constructor(
    private usersService: UsersService,
    private booksService: BooksService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.getActiveUser()
    this.getBorrowedBooks()
    this.detectSelectedBook()
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
      this.cdr.detectChanges()
    }, (error) => {
      console.error('Error fetching borrowed books:', error)
    })
  }

  detectSelectedBook(): void {
    this.booksService.detectSelectedBook()
    this.booksService.isActiveModalBehaviorSubject.subscribe((data: boolean) => {
      this.isActiveModal = data
      this.getBorrowedBooks()
    })
  }

  openBookDetails(book: Book): void {
    this.booksService.openBookDetails(book, 'ProfileComponent')
  }

  returnBorrowedBook(userId: number, bookId: number): void {
    this.booksService.returnBorrowedBook(userId!, bookId!).subscribe(() => {
      this.getBorrowedBooks()
    })
  }

}
