import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotFoundGuard implements CanActivate {
  constructor(private toastService: ToastrService) {}

  canActivate(): boolean {
    this.toastService.error('The route you tried to access does not exist');
    return true;
  }
}
