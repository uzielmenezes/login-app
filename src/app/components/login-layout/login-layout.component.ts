import { Component, input, output } from '@angular/core';

@Component({
  selector: 'login-layout',
  standalone: true,
  imports: [],
  templateUrl: './login-layout.component.html',
  styleUrl: './login-layout.component.scss',
})
export class LoginLayoutComponent {
  title = input<string>('');
  primaryBtnText = input<string>('');
  secondaryBtnText = input<string>('');
  disablePrimaryBtn = input<boolean>(true);
  onSubmit = output<void>({ alias: 'submit' });
  onNavigate = output<void>({ alias: 'navigate' });

  submit() {
    this.onSubmit.emit();
  }

  navigate() {
    this.onNavigate.emit();
  }
}
