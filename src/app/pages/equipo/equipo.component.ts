import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonHeader, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton } from "@ionic/angular/standalone";
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { AuthService } from 'src/app/auth/service/auth.service';
import { User } from 'src/app/shared/models/User.model';
import { EquipoService } from 'src/app/shared/services/equipo.service';
import { Equipo } from 'src/app/shared/models/Equipo.model';

@Component({
  selector: 'app-equipo',
  standalone: true,
  imports: [IonButton, HeaderComponent, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, CommonModule, RouterModule],
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.scss'],
})
export class EquipoComponent  implements OnInit {
  user: User | null = null;
  equipo: Equipo | null = null;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getUserData();
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
