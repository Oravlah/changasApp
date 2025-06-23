import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonSelect, IonSelectOption, IonHeader, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonItem, IonLabel, IonIcon, IonGrid, IonRow, IonCol } from "@ionic/angular/standalone";
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { AuthService } from 'src/app/auth/service/auth.service';
import { User } from 'src/app/shared/models/User.model';
import { ToastrService } from 'ngx-toastr';
import { Equipo } from 'src/app/shared/models/Equipo.model';
import { EquipoService } from 'src/app/shared/services/equipo.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-equipo',
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonIcon, IonSelect, IonSelectOption, IonItem , IonLabel, ReactiveFormsModule, IonButton, HeaderComponent, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, CommonModule, RouterModule],
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.scss'],
})
export class EquipoComponent  implements OnInit {
  updateForm: FormGroup;
  toastr= inject(ToastrService)
  user: User | null = null;
  equipo: Equipo | null = null;
  equipos: Equipo[] = [];

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private equipoService: EquipoService,
    private userService: UserService,
  ) {
    this.updateForm = this.fb.group({
      equipo: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadUserData();
    this.loadEquipos();
  }

  loadEquipos(): void {
    this.equipoService.getEquipos().subscribe({
      next: (equipos) => {
        this.equipos = equipos;
      },
      error: (err) => {
        console.error('Error al cargar equipos:', err);
        this.toastr.error('No se pudieron cargar los equipos');
      }
    });
  }

  loadUserData(): void {
    this.authService.userInfo.subscribe({
      next: (userData) => {
        this.user = userData;
        if (userData?.equipo) {
          this.equipo = userData.equipo;
        } else {
          this.equipo = null;
          console.warn('El usuario no tiene equipo asociado.');
        }
      },
      error: (err) => {
        console.error('Error al obtener el usuario logeado:', err);
      }
    });
  }


  assignEquipoToUser(): void {
    if (!this.user) {
      this.toastr.error('No hay usuario cargado');
      return;
    }

    if (this.updateForm.invalid) {
      this.toastr.error('Por favor, seleccione un equipo válido');
      return;
    }

    const equipoId = this.updateForm.value.equipo;

    this.userService.updateUserPartial({ equipo: equipoId }).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        this.equipo = updatedUser.equipo || null;
        this.toastr.success('Equipo asignado correctamente');
      },
      error: (err) => {
        console.error('Error asignando equipo:', err);
        this.toastr.error('Error al asignar equipo');
      }
    });
  }

}
