import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonSelect, IonSelectOption, IonHeader, IonContent, IonCard, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCardContent, IonButton, IonToolbar, IonButtons, IonTitle, IonItem, IonModal, IonLabel, IonInput } from "@ionic/angular/standalone";
import { OverlayEventDetail } from '@ionic/core/components';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { PartidoService } from 'src/app/shared/services/partido.service';
import { Partido } from 'src/app/shared/models/Partido.model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Equipo } from 'src/app/shared/models/Equipo.model';
import { EquipoService } from 'src/app/shared/services/equipo.service';


@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [IonSelect, IonSelectOption, IonInput, IonLabel, IonItem, ReactiveFormsModule, IonModal, IonTitle, IonButtons, IonToolbar, IonButton, HeaderComponent, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCard, IonContent, IonHeader, CommonModule, RouterModule],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
})
export class HistorialComponent  implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  updateForm: FormGroup;
  equipo: Equipo[] = [];
  partidos: Partido[] = [];
  infoPartidos: Partido | null = null;
  isModalOpen = false;
  toastr = inject(ToastrService);
  isEditModalOpen = false;
  partidoEditando: Partido | null = null;


  constructor(
    private partidoService: PartidoService,
    private fb: FormBuilder,
    private authService: AuthService,
    private equipoService: EquipoService
  ) {
    this.updateForm = this.fb.group({
      nombre: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      lugar: ['', [Validators.required]],
      equipo_local: ['', [Validators.required]],
      equipo_visitante: ['', [Validators.required]],
      goles_local: [0, [Validators.required, Validators.min(0)]],
      goles_visitante: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.authService.userInfo.subscribe({
      next: (user) => {
        if (!user || !user.equipo || !user.equipo.id) {
          console.log('Usuario no autenticado o sin equipo asociado');
          return;
        }

        const equipoId = user.equipo.id;

        this.partidoService.Partidos$.subscribe({
          next: (partidos) => {
            this.partidos = partidos.filter(p =>
              p.equipo_local === equipoId || p.equipo_visitante === equipoId
            );
          },
          error: (err) => {
            console.error('Error al recibir partidos:', err);
            this.toastr.error('No se pudieron cargar los partidos');
          }
        });
      },
      error: () => {
        console.log('Error al obtener la información del usuario');
      }
    });

    this.equipoService.getEquipos().subscribe({
      next: (equipos) => {
        this.equipo = equipos;
      },
      error: (err) => {
        console.error('Error al cargar equipos:', err);
        this.toastr.error('No se pudieron cargar los equipos');
      }
    });

  }


  openModal(partido: Partido) {
    this.infoPartidos = partido;
    this.isModalOpen = true;
  }

  cancel() {
    this.isModalOpen = false;
  }

  confirm() {
    this.toastr.success('Confirmado');
    this.isModalOpen = false;
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      console.log('Confirmado:', event.detail.data);
    }
  }


  obtenerNombreEquipo(equipoId: string): string {
    const equipo = this.equipo.find(e => e.id === equipoId);
    return equipo ? equipo.nombre : 'Desconocido';
  }


  loadPartidos(): void {
    this.partidoService.getPartidos().subscribe({
      next: (partidos) => {
        console.log('Partidos cargados:', partidos);
        this.partidos = partidos;
      },
      error: (err) => {
        console.error('Error al cargar partidos:', err);
        this.toastr.error('No se pudieron cargar los partidos');
      }
    });
  }

  openEditModal(partido: Partido) {
    console.log('Abriendo modal de edición para el partido:', partido);
    this.partidoEditando = partido;
    this.updateForm.patchValue(partido);
    this.isEditModalOpen = true;
  }


  cancelEdit() {
    this.isEditModalOpen = false;
  }


  onSubmit() {
    if (!this.partidoEditando) return;

    if (this.updateForm.invalid) {
      this.toastr.error('Por favor, complete todos los campos correctamente');
      return;
    }

    const cambios = this.updateForm.value;

    this.partidoService.editPartido(this.partidoEditando.id, cambios).subscribe({
      next: () => {
        this.toastr.success('Partido actualizado correctamente');
        this.loadPartidos();
        this.isEditModalOpen = false;
        this.partidoEditando = null;
      },
      error: (err) => {
        console.error('Error al actualizar el partido:', err);
        this.toastr.error('No se pudo actualizar el partido');
      }
    });
  }

}
