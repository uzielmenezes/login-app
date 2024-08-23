import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotFoundGuard implements CanActivate {
  constructor(private toastService: ToastrService, private route: Router) {}

  canActivate(): boolean {
    const authToken = sessionStorage.getItem('auth-token');

    if (authToken) {
      this.toastService.error('The route you tried to access does not exist');
      this.route.navigate(['user']);
    } else {
      this.toastService.error('You do not have access');
    }

    return true;
  }
}
