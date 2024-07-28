import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../../core/services/books.service';
import { Book } from '../../../core/models/book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent implements OnInit {

  selectedBook?: Book | null
  fromWhichComponentTheModalIsOpened: string | null = ''

  constructor(
    private bookService: BooksService
  ) {}

  ngOnInit(): void {
    this.detectSelectedBook()
    this.detectFromWhichComponentModalIsOpened()
  }

  detectSelectedBook(): void {
    this.bookService.selectedBook.subscribe((book: Book | null) => {
      this.selectedBook = book
    })
  }

  detectFromWhichComponentModalIsOpened(): void {
    this.bookService.bookDetailsComponentOpenedFrom.subscribe((data: string | null) => {
      this.fromWhichComponentTheModalIsOpened = data
    })
  }

  closeModal(): void {
    this.bookService.selectedBook.next(null)
    this.bookService.bookDetailsComponentOpenedFrom.next(null)
  }

}
