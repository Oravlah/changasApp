import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonHeader, IonContent, IonCard, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCardContent, IonButton, IonToolbar, IonButtons, IonTitle, IonItem, IonModal } from "@ionic/angular/standalone";
import { OverlayEventDetail } from '@ionic/core/components';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { PartidoService } from 'src/app/shared/services/partido.service';
import { Partido } from 'src/app/shared/models/Partido.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [IonItem, ReactiveFormsModule, IonModal, IonTitle, IonButtons, IonToolbar, IonButton, HeaderComponent, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCard, IonContent, IonHeader, CommonModule, RouterModule],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
})
export class HistorialComponent  implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  updateForm: FormGroup;
  partidos: Partido[] = [];
  infoPartidos: Partido | null = null;
  isModalOpen = false;
  toastr = inject(ToastrService);
  isEditModalOpen = false;
  partidoEditando: Partido | null = null;


  constructor(
    private partidoService: PartidoService,
    private fb: FormBuilder,
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
    this.partidoService.Partidos$.subscribe({
      next: (partidos) => {
        console.log('Actualización de partidos:', partidos);
        this.partidos = partidos;
      },
      error: (err) => {
        console.error('Error al recibir partidos:', err);
        this.toastr.error('No se pudieron cargar los partidos');
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
    this.partidoEditando = partido;
    this.updateForm.patchValue(partido); // Rellena el formulario
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

    const partidoActualizado: Partido = {
      ...this.partidoEditando,
      ...this.updateForm.value
    };

    this.partidoService.editPartido(partidoActualizado.id, partidoActualizado).subscribe({
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
