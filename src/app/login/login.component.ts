import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, Form, EmailValidator } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { AllApiService } from '../services/api/all-api.service';
import { Login } from '../interfaces/interfaces';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  token: any;
  login: Login = {
    email: '',
    password: ''
  };

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private allapiservices: AllApiService,
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  ngOnInit() {
    // if (isPlatformBrowser(this.platformId)) {
    //   const token = sessionStorage.getItem('token');
    //   console.log('Token:', token);
    // }
  }

  isLoading = false;

  // onLogin(from:any){
  //   this.allapiservices.login(this.login).subscribe((data)=>{
  //     console.log(data);
  //   });
  // }
  
  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (res) => {
          console.log('Login response:', res);
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('token', res.jwt);
            this.token = res.jwt;
          }
          sessionStorage.getItem('token');
          if (this.token) {
            this.isLoading = false;
            this.router.navigate(['']);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Invalid email or password';
          console.error('Login error:', error);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
    this.router.navigate(['/'], { replaceUrl: true });
  }
  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }
}
