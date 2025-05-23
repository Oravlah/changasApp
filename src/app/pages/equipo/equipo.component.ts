import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonHeader, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton } from "@ionic/angular/standalone";
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { AuthService } from 'src/app/auth/service/auth.service';
import { User } from 'src/app/shared/models/User.model';
import { ToastrService } from 'ngx-toastr';
import { Equipo } from 'src/app/shared/models/Equipo.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-equipo',
  standalone: true,
  imports: [ReactiveFormsModule, IonButton, HeaderComponent, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, CommonModule, RouterModule],
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.scss'],
})
export class EquipoComponent  implements OnInit {
  updateForm: FormGroup;
  toastr= inject(ToastrService)
  user: User | null = null;
  equipo: Equipo | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    this.updateForm = this.fb.group({
      equipo: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.authService.userInfo.subscribe(userData => {
      if (userData) {
        this.user = userData;
        console.log('Usuario actual:', this.user);

        if (this.user?.equipo) {
          this.equipo = this.user.equipo;
          console.log('Datos del equipo:', this.equipo);
        } else {
          console.error('El usuario no tiene un equipo asociado.');
        }
      }
    });
  }




  getUserData(): void {
    this.authService.getUserInfo().subscribe({
      next: (userData) => {
        this.user = userData;
        console.log('Usuario actual:', this.user);

        if (this.user?.equipo) {
          this.equipo = this.user.equipo;
          console.log('Datos del equipo:', this.equipo);
        } else {
          console.error('El usuario no tiene un equipo asociado.');
        }
      },
      error: (err) => {
        console.error('Error al obtener el usuario:', err);
      }
    });
  }

}
