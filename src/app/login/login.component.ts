import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
// import { authGuard } from '../guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string | null = null;
  password: string | null = null;
  emailError: string = '';
  passwordError: string = '';
  showPassword: boolean = false;
  submitText: string = "Login";
  disableBtn: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastService,
    private authService: AuthService
  ) { }

  onSubmit() {
    this.submitText = "processing...";
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
      setTimeout(() => {
        this.authService.setUserToken({ email: this.email, password: this.password }).subscribe({
          next: (response: any) => {
            this.submitText = "Login";
            if (response.statusCode === 200) {
              this.toastr.openSnackBar(response?.message, "success", 4000);
              this.router.navigate(['/checkout'], {
                relativeTo: this.route,
                queryParams: {
                  detail: 'sales-checkout'
                }
              })
            } else {
              this.toastr.openSnackBar(response?.message, "error", 4000);
            }

          },
          error: (err: any) => {
            this.toastr.openSnackBar(err, "error", 4000);
          }
        })
      }, 2000);

    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  readMore() {
    window.open('https://www.aairlabs.com/', '_blank');
  }

  userLogoutBeforeLeaving() {
    if (
      this.authService.userIsLoggedIn() && true
    ) {
      this.router.navigate(['/dashboard/statistics'], {
        relativeTo: this.route
      }
      );
    }
  }

  ngOnInit(): void {
    this.userLogoutBeforeLeaving();
  }

}
