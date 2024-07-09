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

type SignupForm = {
  name: FormControl;
  email: FormControl;
  password: FormControl;
  passwordConfirm: FormControl;
};

@Component({
  selector: 'signup',
  standalone: true,
  imports: [LoginLayoutComponent, ReactiveFormsModule, PrimaryInputComponent],
  providers: [LoginService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignUpComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  signupForm!: FormGroup<SignupForm>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submit() {
    this.loginService
      .signup(
        this.signupForm.value.name,
        this.signupForm.value.email,
        this.signupForm.value.password,
        this.signupForm.value.passwordConfirm
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.toastService.success('Successfully signed in');
        },
        error: (err) => {
          this.toastService.error('Unexpected error, try again later');
          console.log(err);
        },
      });
  }

  navigate() {
    this.router.navigate(['/login']);
  }
}
