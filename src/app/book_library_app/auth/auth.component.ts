import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {

  selectedAuthMethod: string | null = null
  authForm!: FormGroup

  constructor(
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.initializeForm()
  }
  
  changeAuthMethod(authMethod: string): void {
    this.selectedAuthMethod = authMethod
  }

  goBackToChooseAuthMethod(): void {
    this.selectedAuthMethod = null
    this.authForm.reset()
  }

  submitAuthForm(): void {
    
  }

  initializeForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(30)]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]]
    })
  }

}
