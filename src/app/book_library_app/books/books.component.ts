import { Component, OnInit, Output } from '@angular/core';

import { BooksService } from '../../core/services/books.service';

import { Book } from '../../core/models/book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit {

  books: Book[] = []
  isActiveModal = false

  constructor(
    private booksService: BooksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllBooks()
    this.detectSelectedBook()
  }

  getAllBooks(): void {
    this.booksService.getAllBooks().subscribe((books: Book[]) => {
      this.books = books
      console.log(books)
    })
  }

  detectSelectedBook(): void {
    this.booksService.detectSelectedBook()
    this.booksService.isActiveModalBehaviorSubject.subscribe((data: boolean) => {
      this.isActiveModal = data
    })
  }

  openBookDetails(book: Book): void {
    this.booksService.openBookDetails(book, 'BooksComponent')
  }

  navigateToAddNewBookComponent(): void {
    this.router.navigate(['books/add-book'])
  }

}
