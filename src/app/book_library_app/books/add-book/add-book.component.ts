import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../core/services/users.service';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-add-book',
  standalone: false,
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss'
})
export class AddBookComponent implements OnInit {

  addBookForm!: FormGroup
  activeUser!: User
  publicationYearOptions: number[] = []

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.activeUser = this.usersService.activeUser.value!;
    this.initializeForm();
    for (let i = 1900; i <= 2024; i ++) {
      this.publicationYearOptions.push(i)
    }
  }


  initializeForm(): void {
    this.addBookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publicationYear: [null, Validators.required],
      addedBy: [this.activeUser.user_id, Validators.required],
    })
  }
}
