import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonHeader, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/angular/standalone";
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { User } from 'src/app/shared/models/User.model';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, HeaderComponent, CommonModule, RouterModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent  implements OnInit {
  userinfo: User | null = null;
  toastr= inject(ToastrService)

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser():void{
    this.authService.getUserInfo().subscribe({
      next: (user) => {
        this.userinfo = user;
      },
      error: (err) => {
        console.error('Error al cargar la información del usuario:', err);
      }
    })
  }

  deleteUser():void {
    this.authService.deleteUser().subscribe({
      next: () => {
        this.authService.logout();
        console.log('Usuario eliminado correctamente');
        this.toastr.success('Usuario eliminado correctamente');
      },
      error: (err) => {
        console.error('Error al eliminar el usuario:', err);
        this.toastr.error('Error al eliminar el usuario');
      }
    });
  }


  quitarEquipo():void {
    this.userService.updateUserPartial({ equipo: null }).subscribe({
      next: (user) => {
        this.userinfo = user;
        console.log('Equipo quitado correctamente');
        this.toastr.success('Equipo quitado correctamente');
      },
      error: (err) => {
        console.error('Error al quitar el equipo:', err);
        this.toastr.error('Error al quitar el equipo');
      }
    })
  }

  logOut():void {
    this.authService.logout();
    console.log('Logout exitoso');
    this.toastr.success('Usuario desconectado correctamente');
  }

}
