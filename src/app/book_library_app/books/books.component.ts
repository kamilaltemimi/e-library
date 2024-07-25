import { Component, OnInit } from '@angular/core';

import { BooksService } from '../../core/services/books.service';

import { Book } from '../../core/models/book';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit {

  books: Book[] = []

  constructor(
    private booksService: BooksService
  ) {}

  ngOnInit(): void {
    this.booksService.getAllBooks().subscribe((books: Book[]) => {
      this.books = books
      console.log(books)
    })
  }

}
