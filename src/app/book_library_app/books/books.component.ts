import { Component, OnInit, Output } from '@angular/core';

import { BooksService } from '../../core/services/books.service';

import { Book } from '../../core/models/book';
import { EventEmitter } from 'stream';

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
    private booksService: BooksService
  ) {}

  ngOnInit(): void {
    this.booksService.getAllBooks().subscribe((books: Book[]) => {
      this.books = books
      console.log(books)
    })
  }

  openBookDetails(book: Book): void {
    this.isActiveModal = true;
    this.booksService.selectedBook.next(book)
  }

}
