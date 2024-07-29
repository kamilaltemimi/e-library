import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';

import { User } from '../../../core/models/user';
import { Book } from '../../../core/models/book';

import { BooksService } from '../../../core/services/books.service';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent implements OnInit {

  selectedBook!: Book | null;
  fromWhichComponentTheModalIsOpened: string | null = '';
  activeUser: User | null = null;
  booksIds: number[] = [];
  alreadyBorrowedBook = '';

  constructor(
    private booksService: BooksService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.setActiveUser();
    this.detectSelectedBook();
    this.detectFromWhichComponentModalIsOpened();
    this.getAlreadyBorrowedBooksIds();
  }

  setActiveUser(): void {
    this.usersService.activeUser.subscribe((data: User | null) => this.activeUser = data);
  }

  detectSelectedBook(): void {
    this.booksService.selectedBook.subscribe((book: Book | null) => {
      this.selectedBook = book;
    });
  }

  detectFromWhichComponentModalIsOpened(): void {
    this.booksService.bookDetailsComponentOpenedFrom.subscribe((data: string | null) => {
      this.fromWhichComponentTheModalIsOpened = data;
    });
  }

  returnBorrowedBook(): void {
    this.booksService.returnBorrowedBook(this.activeUser!.user_id!, this.selectedBook!.book_id!).subscribe(() => {
      this.closeModal();
    });
  }

  getAlreadyBorrowedBooksIds(): void {
    this.booksService.getBorrowedBooks(this.activeUser!.user_id!).pipe(
      map((books: Book[]) => {
        for (let i = 0; i < books.length; i ++) {
          this.booksIds.push(books[i].book_id!)
        };
      })).subscribe();
  }

  borrowBook(): void {
    const alreadyBorrowedBook = this.booksIds.find((id: number) => id === this.selectedBook!.book_id);
    if (!alreadyBorrowedBook){
      this.booksService.borrowBook(this.activeUser!.user_id, this.selectedBook!.book_id!).subscribe(() => {
        this.closeModal();
      });
    } else {
      this.alreadyBorrowedBook = 'You have already borrowed this book!';
    };
  }

  closeModal(): void {
    this.booksService.selectedBook.next(null);
    this.booksService.bookDetailsComponentOpenedFrom.next(null);
  }
}
