import { Injectable ,Inject, PLATFORM_ID} from '@angular/core';
import { of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  login(email: string, password: string) {
    const validEmail = 'admin@gmail.com';
    const validPassword = '123456';

    if (email === validEmail && password === validPassword) {
      const fakeToken = 'fake-jwt-token';
      return of({ token: fakeToken }).pipe(
        delay(1000),
        tap(res => {
          if (isPlatformBrowser(this.platformId)) {
          sessionStorage.setItem('token', res.token);
          }
        })
      );
    } else {
      return throwError(() => ({ error: { message: 'Invalid email or password' } }));
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('token');
    }
  }

  isLoggedIn() {
    if (isPlatformBrowser(this.platformId)) {
      return !!sessionStorage.getItem('token');
    }
    return false;
  
  }
  
}
