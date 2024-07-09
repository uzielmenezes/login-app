import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Input() disablePrimaryBtn: boolean = true;

  @Output('submit') onSubmit: EventEmitter<any> = new EventEmitter();
  @Output('navigate') onNavigate: EventEmitter<any> = new EventEmitter();

  submit() {
    this.onSubmit.emit();
  }

  navigate() {
    this.onNavigate.emit();
  }
}
