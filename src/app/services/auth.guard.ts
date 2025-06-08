import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') {
      return false; // or true depending on how you want to handle SSR
    }

    const token = sessionStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login'], { replaceUrl: true });
      return false;
    }
    return true;
  }
}
