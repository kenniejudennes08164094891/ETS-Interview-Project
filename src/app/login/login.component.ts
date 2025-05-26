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
  email: string = '';
  password: string = '';
  emailError: string = '';
  passwordError: string = '';
  showPassword: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastService,
    private authService: AuthService
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
      this.authService.setUserToken({ email: this.email, password: this.password }).subscribe({
        next: (response: any) => {
          console.log("response>>",response)
          this.toastr.openSnackBar(response?.message, "success", 4000);
          this.router.navigate(['/checkout'], {
            relativeTo: this.route,
            queryParams: {
              detail: 'sales-checkout'
            }
          })
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
