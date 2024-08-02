import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { LoginService } from '../../services/login.service';

type LoginForm = {
  email: FormControl;
  password: FormControl;
};

@Component({
  selector: 'login',
  standalone: true,
  imports: [LoginLayoutComponent, ReactiveFormsModule, PrimaryInputComponent],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  loginForm!: FormGroup<LoginForm>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submit() {
    this.loginService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.toastService.success('Successfully logged in');
          this.toUserPage();
        },
        error: (err) => {
          this.toastService.error('Unexpected error, try again later');
          console.log(err);
        },
      });
  }

  navigate() {
    this.router.navigate(['/signup']);
  }

  private toUserPage() {
    this.router.navigate(['/user']);
  }
}
