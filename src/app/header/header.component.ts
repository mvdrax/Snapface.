import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

// RouterLinkActive permet d'attribuer une classe CSS au lien quand sa route est la route active :

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {


   constructor(private router: Router) { }


    ngOnInit(): void {
  }

  onAddNewFaceSnap() {
    this.router.navigateByUrl('/create');
  }

}
