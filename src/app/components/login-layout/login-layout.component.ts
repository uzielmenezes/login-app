import { Component, Input } from '@angular/core';

@Component({
  selector: 'login-layout',
  standalone: true,
  imports: [],
  templateUrl: './login-layout.component.html',
  styleUrl: './login-layout.component.scss',
})
export class LoginLayoutComponent {
  @Input() title: string = '';
  @Input() primaryBtnText: string = '';
  @Input() secondaryBtnText: string = '';
}
