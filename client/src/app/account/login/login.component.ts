import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AccountService } from '../account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private toastService: ToastrService,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  onSubmit() {
    this.accountService.login(this.loginForm.value).subscribe({
      next: (user) => {
        const redirect = this.accountService.redirectUrl
          ? this.accountService.redirectUrl
          : '/store';
        this.router.navigateByUrl(redirect);
        this.accountService.redirectUrl = null; // clearing the redirct url post navigation
        this.toastService.success('Successfully Logged In');
      },
      error: () => {
        this.toastService.error('Invalid username or password');
      },
    });
  }
}
