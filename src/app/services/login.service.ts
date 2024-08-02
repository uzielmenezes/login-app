import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { LoginResponse, SignUpResponse } from '../types/login-response.type';

const API_URL = `http://localhost:8080/auth`;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private LOGIN_URL: string = `${API_URL}/login`;

  private SIGNUP_URL: string = `${API_URL}/register`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.LOGIN_URL, { email, password })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('auth-token', value.token);
          sessionStorage.setItem('username', value.email);
        })
      );
  }

  signup(
    name: string,
    email: string,
    password: string
  ): Observable<SignUpResponse> {
    return this.http
      .post<SignUpResponse>(this.SIGNUP_URL, {
        name,
        email,
        password,
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
