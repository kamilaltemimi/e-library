import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../../core/services/books.service';
import { Book } from '../../../core/models/book';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent implements OnInit {

  selectedBook?: Book

  constructor(
    private bookService: BooksService
  ) {}

  ngOnInit(): void {
    this.bookService.selectedBook.subscribe((book: Book | undefined) => {
      this.selectedBook = book
    })
  }

}
