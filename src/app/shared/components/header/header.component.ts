import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  HostListener,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader } from "@ionic/angular/standalone";
import { AuthService } from 'src/app/auth/service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, IonHeader],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isMobileMenuOpen = false;
  isUserMenuOpen = false;
  toastr = inject(ToastrService);

  @ViewChild('userMenu', { static: false }) userMenuRef!: ElementRef;
  @ViewChild('menuToggle', { static: false }) menuToggleRef!: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleUserMenu(event: MouseEvent) {
    event.stopPropagation(); // Evita que el clic se propague al documento
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout() {
    this.authService.logout();
    this.toastr.success('Logout successful', 'Success');
    this.router.navigateByUrl('/login');
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInsideMenu = this.userMenuRef?.nativeElement?.contains(event.target);
    const clickedToggle = this.menuToggleRef?.nativeElement?.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      this.isUserMenuOpen = false;
    }
  }
}
