import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { Book } from '../models/book'
import { HttpClient } from '@angular/common/http'
import { BorrowedBook } from '../models/borrowed-book'

@Injectable({
    providedIn: 'root'
})

export class BooksService{

    selectedBook = new BehaviorSubject<Book | null>(null)
    bookDetailsComponentOpenedFrom = new BehaviorSubject<string | null>(null)
    isActiveModalBehaviorSubject = new BehaviorSubject<boolean>(false)

    URL = "http://localhost:3000/books"

    constructor(
        private http: HttpClient
    ) {}

    getAllBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(this.URL)
    }

    addNewBook(newBook: Book): Observable<Book> {
        return this.http.post<Book>(this.URL, newBook)
    }

    getBookById(bookId: number): Observable<Book> {
        return this.http.get<Book>(`${this.URL}/${bookId}`)
    }

    getBorrowedBooks(userId: number): Observable<Book[]> {
        return this.http.get<Book[]>(`${this.URL}/borrowed-books/${userId}`)
    }

    returnBorrowedBook(userId: number, bookId: number): Observable<void> {
        return this.http.delete<void>(`${this.URL}/borrowed-books/${userId}/${bookId}`)
    }

    openBookDetails(book: Book, component: string): void {
        this.selectedBook.next(book)
        this.bookDetailsComponentOpenedFrom.next(component)
    }

    detectSelectedBook(): void {
        this.selectedBook.subscribe((data: Book | null) => {
          data ? this.isActiveModalBehaviorSubject.next(true) : this.isActiveModalBehaviorSubject.next(false)
        })
    }

}