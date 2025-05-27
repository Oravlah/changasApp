import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonHeader, IonContent, IonCard, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCardContent } from "@ionic/angular/standalone";
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { PartidoService } from 'src/app/shared/services/partido.service';
import { Partido } from 'src/app/shared/models/Partido.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [HeaderComponent, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCard, IonContent, IonHeader, CommonModule, RouterModule],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
})
export class HistorialComponent  implements OnInit {
  partidos: Partido[] = [];
  toastr = inject(ToastrService);

  constructor(
    private partidoService: PartidoService,
  ) { }

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

}
