import { Component } from '@angular/core';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent {

  books = ['abc', 'acc', 'aaa', 'bba', 'abb', 'lla']

}
