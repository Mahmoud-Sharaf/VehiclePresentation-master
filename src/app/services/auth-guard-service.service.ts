import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(public auth: AuthServiceService, public router: Router) {}
  
  public canActivate():  boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
