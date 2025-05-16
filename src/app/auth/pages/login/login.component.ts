import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonButton } from "@ionic/angular/standalone";
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonButton, IonCardTitle, IonCardContent, IonCardHeader, IonCard, IonContent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  loginForm: FormGroup;
  toastr = inject(ToastrService)
  error: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}


  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          this.toastr.success('Login successful', 'Success');
          this.router.navigateByUrl('/tabs/inicio');
        },
        (error: HttpErrorResponse) => {
          if (error.error && error.error.message) {
            this.error = error.error.message;
          } else {
            this.error = 'An error occurred during login. Please try again.';
          }
          this.toastr.error(this.error);
        }
      );
    }
  }


}
