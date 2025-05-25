import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  emailError: string = '';
  passwordError: string = '';
  showPassword: boolean = false;

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private toastr: ToastService
  ) { }

  onSubmit() {
    this.emailError = '';
    this.passwordError = '';

    if (!this.email) {
      this.emailError = 'Email is required';
    }

    if (!this.password) {
      this.passwordError = 'Password is required';
    }

    if (this.email && this.password) {
      // Handle login logic
      console.log('Login submitted:', { email: this.email, password: this.password });
      this.toastr.openSnackBar("Login successful!","success");
      this.router.navigate(['/checkout'],{
        relativeTo: this.route,
        queryParams:{
          detail: 'sales-checkout'
        }
      })
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  readMore() {
    window.open('https://www.aairlabs.com/', '_blank');
  }
}
