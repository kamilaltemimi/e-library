import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { User } from '../../core/models/user';
import { AuthMethod } from '../../core/enums/auth_method';

import { UsersService } from '../../core/services/users.service';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit, OnDestroy {

  error: string | null = null;

  selectedAuthMethod: string | null = null;
  authForm!: FormGroup;

  existingUsers: User[] = [];

  private destroy$ = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ){}

  ngOnInit(): void {
    const userData = localStorage.getItem('userData')
    if (userData) {
      const parsedData = JSON.parse(userData)
      this.usersService.activeUser.next(parsedData)
      this.router.navigate(['/homepage'])
    }
    this.initializeForm();
    this.usersService.getAllUsers().subscribe((data: User[]) => this.existingUsers = data);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
  
  changeAuthMethod(authMethod: string): void {
    this.selectedAuthMethod = authMethod;
  }

  goBackToChooseAuthMethod(): void {
    this.selectedAuthMethod = null;
    this.authForm.reset();
  }

  submitAuthForm(): void {
    const { email, username, password } = this.authForm.value;
    const existingEmail = this.existingUsers.find((user: User) => user.email === email);
    const existingUsername = this.existingUsers.find((user: User) => user.username === username);
    const existingPassword = this.existingUsers.find((user: User) => user.email === email && user.username === username && user.password === password);

    this.error = null;

    if (this.selectedAuthMethod === AuthMethod.register) {
      if (existingUsername && existingEmail) {
        this.error = "This username and email are already taken";
        return;
      } else if (existingEmail) {
        this.error = "This email is already taken";
        return;
      } else if (existingUsername) {
        this.error = "This username is already taken";
        return;
      }
      this.usersService.addUser(this.authForm.value).pipe(takeUntil(this.destroy$)).subscribe((data: User) => console.log(data));
    } else if (this.selectedAuthMethod === AuthMethod.login) {
      if (!existingEmail) {
        this.error = "Invalid email address";
        return;
      } else if (!existingUsername) {
        this.error = "Invalid username";
        return;
      } else if (!existingPassword) {
        this.error = "Invalid password";
        return;
      } else if (existingUsername && existingEmail && existingPassword) {
        const loggedUser = {...this.authForm.value, user_id: existingEmail.user_id, created_at: existingEmail.created_at}
        this.usersService.activeUser.next(loggedUser);
        localStorage.setItem('userData', JSON.stringify(loggedUser))
        this.router.navigate(['/homepage']);
      }
    }
  }

  initializeForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(30)]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]]
    });
  }
}
