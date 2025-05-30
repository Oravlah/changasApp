import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonHeader, IonContent, IonCard } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { AuthService } from 'src/app/auth/service/auth.service';
import { PartidoService } from 'src/app/shared/services/partido.service';
import { Partido } from 'src/app/shared/models/Partido.model';
import { User } from 'src/app/shared/models/User.model';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [IonContent, HeaderComponent, IonHeader, CommonModule, RouterModule, IonCard],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent  implements OnInit {
  partidosUsuario: Partido[] = [];
  cantidadPartidos: number = 0;
  user: User | null = null;

  constructor(
    private authService: AuthService,
    private partidoService: PartidoService
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
  }

}
