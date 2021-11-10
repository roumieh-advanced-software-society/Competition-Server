import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean{
    if(this.isLoggedIn()) {
      //goto home
      return true;
    }
    //navigate to login page as user is not auth
    this.router.navigate(['/login']);
    return false;
  }

  public isLoggedIn(): boolean {
    let status = false;
    if(localStorage.getItem("isLoggedIn")=="true"){
      status = true;
    }
    else{
      status = false;
    }
    return status;
  }

}
