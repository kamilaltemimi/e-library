import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { Book } from '../models/book'
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})

export class BooksService{

    selectedBook = new BehaviorSubject<Book | undefined>(undefined)

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

}