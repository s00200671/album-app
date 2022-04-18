import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { User } from './interfaces/user';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private user : any;

  constructor(
    private authService: AuthService,
    private router: Router
    ){}

  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      if(this.authService.isLoggedIn) return true;
      else this.router.navigateByUrl("/sign-in");
      return false;
  }
}
