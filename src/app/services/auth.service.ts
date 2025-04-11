import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  login(email: string, password: string) {
    // Fake credentials
    const validEmail = 'admin@gmail.com';
    const validPassword = '123456';

    if (email === validEmail && password === validPassword) {
      const fakeToken = 'fake-jwt-token';
      return of({ token: fakeToken }).pipe(
        delay(1000), // simulate network delay
        tap(res => {
          localStorage.setItem('token', res.token);
        })
      );
    } else {
      return throwError(() => ({ error: { message: 'Invalid email or password' } }));
    }
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
