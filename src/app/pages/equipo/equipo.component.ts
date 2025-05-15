import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonHeader, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/angular/standalone";
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-equipo',
  standalone: true,
  imports: [HeaderComponent, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, CommonModule, RouterModule],
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.scss'],
})
export class EquipoComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
