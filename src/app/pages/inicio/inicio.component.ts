import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonHeader, IonContent, IonCard, IonIcon } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { AuthService } from 'src/app/auth/service/auth.service';
import { PartidoService } from 'src/app/shared/services/partido.service';
import { Partido } from 'src/app/shared/models/Partido.model';
import { User } from 'src/app/shared/models/User.model';
import { Equipo } from 'src/app/shared/models/Equipo.model';
import { EquipoService } from 'src/app/shared/services/equipo.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [IonIcon, IonContent, HeaderComponent, IonHeader, CommonModule, RouterModule, IonCard],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent  implements OnInit {
  partidosUsuario: Partido[] = [];
  cantidadPartidos: number = 0;
  user: User | null = null;
  equipo: Equipo | null = null;
  equipos: Equipo[] = [];

  constructor(
    private authService: AuthService,
    private partidoService: PartidoService,
    private equipoService: EquipoService
  ) { }

   ngOnInit() {
    this.authService.userInfo.subscribe(user => {
      if (user && user.equipo) {
        this.user = user;
        this.partidoService.getPartidos().subscribe(partidos => {
          this.partidosUsuario = partidos.filter(p =>
            p.equipo_local === user.equipo?.id || p.equipo_visitante === user.equipo?.id
          );
          this.cantidadPartidos = this.partidosUsuario.length;
        });
      }
    });
    this.loadUserData();
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

}
