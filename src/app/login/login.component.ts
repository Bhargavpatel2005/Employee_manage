import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
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
    if (isPlatformBrowser(this.platformId)) {
      const token = sessionStorage.getItem('token');
      console.log('Token:', token);
    }
  }

  isLoading = false;
  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (res) => {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('token', res.token);
          }
          this.isLoading = false;
          this.router.navigate(['']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Invalid email or password';
          console.error('Login error:', error);
        }
      });
    }else {
      this.loginForm.markAllAsTouched();
    }
  }
  get email() {
    return this.loginForm.get('email')!;
  }
  
  get password() {
    return this.loginForm.get('password')!;
  }
  
  
}
