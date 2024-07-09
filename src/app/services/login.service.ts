import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { LoginResponse, SignUpResponse } from '../types/login-response.type';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/login', { email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem('auth-token', value.token);
        sessionStorage.setItem('username', value.email);
      })
    );
  }

  signup(
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ): Observable<SignUpResponse> {
    return this.http
      .post<SignUpResponse>('/signup', {
        name,
        email,
        password,
        passwordConfirm,
      })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('auth-token', value.token);
          sessionStorage.setItem('username', value.email);
          sessionStorage.setItem('login-name', value.name);
        })
      );
  }
}
