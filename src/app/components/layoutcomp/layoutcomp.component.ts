import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layoutcomp',
  imports: [RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './layoutcomp.component.html',
  styleUrl: './layoutcomp.component.css'
})
export class LayoutcompComponent {
  router = inject(Router);
  OnLogOut() {
    localStorage.removeItem('empEmail');
    this.router.navigateByUrl('/login');
  }
}
