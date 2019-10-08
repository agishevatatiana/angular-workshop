import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { AuthService } from './core/services/auth.service';
import { mockUser } from './core/models';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const url = state.url;
    const isAuthRoute = ['login', 'register'].includes(url.slice(1));
    if (this.auth.loggedIn && isAuthRoute) {
        const currentUser = await this.auth.getCurrentUser();
        const currentUserId = currentUser._id;
        // const currentUserId = mockUser._id;
        this.router.navigate(['/dashboard', currentUserId]);
        return false;
    }
    if (!this.auth.loggedIn && !isAuthRoute) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
