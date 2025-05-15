import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonHeader, IonContent, IonCard, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCardContent } from "@ionic/angular/standalone";
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [HeaderComponent, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCard, IonContent, IonHeader, CommonModule, RouterModule],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
})
export class HistorialComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
