import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { min } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm : FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private toastService: ToastrService,
    private router: Router
  ){
    this.registerForm = this.formBuilder.group({
      username: ['',[
        Validators.required , Validators.minLength(3),Validators.maxLength(100)]],
        email : ['',[Validators.required,Validators.email]],
        password : ['',[Validators.required,Validators.minLength(6),Validators.maxLength(100)]]
    });
  }
  onSubmit(){
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }
    this.accountService.register(this.registerForm.value).subscribe({
      next : () => {
        this.toastService.success('Registration successful');
        this.router.navigateByUrl('/account/login');
      },
      error: (error) => {
        console.error('Registration fialed: ',error);

        if(error.status === 409){
          this.toastService.error('Username or email already exists');
        }else{
          this.toastService.error('Registration failed');
        }
      }
    });
  }
}
