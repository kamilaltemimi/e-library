import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../../../core/models/user';

import { BooksService } from '../../../core/services/books.service';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-add-book',
  standalone: false,
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss'
})
export class AddBookComponent implements OnInit {

  addBookForm!: FormGroup;
  activeUser!: User;
  publicationYearOptions: number[] = [];
  selectedFile!: File;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private booksService: BooksService
  ) {}

  ngOnInit(): void {
    this.activeUser = this.usersService.activeUser.value!;
    this.initializeForm();
    for (let i = 1901; i <= 2024; i ++) {
      this.publicationYearOptions.push(i);
    };
  }

  initializeForm(): void {
    this.addBookForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      description: ['', [Validators.required]],
      publicationYear: [null, Validators.required],
      addedBy: [this.activeUser.user_id, [Validators.required]],
      bookImage: [null, [Validators.required]]
    })
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    };
  }
  
  submitAddBookForm(): void {
      this.booksService.addNewBook({...this.addBookForm.value, bookImage: this.selectedFile.name}).subscribe();
  }
}
