import { Component, Input, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { UpperCasePipe } from '@angular/common';
import { Router } from '@angular/router';

/* La directive  [ngStyle]  prendra comme argument un objet où :

les clés sont les styles CSS à modifier ;
les valeurs sont les valeurs que doivent prendre ces styles.

[ngStyle]  pour paramétrer des styles selon des valeurs venant du TypeScript ;

[ngClass]  pour ajouter et retirer des classes CSS selon une condition donnée.
*/

@Component({
  selector: 'app-face-snap',
  standalone: true,
  imports: [
    UpperCasePipe
  ],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss'
})
export class FaceSnapComponent  {
  @Input() faceSnap!: FaceSnap;
  /* Pour qu'une propriété puisse être injectée depuis l'extérieur d'un component,
  il faut lui ajouter le décorateur  @Input(). */

    constructor(private router: Router) {}

    onViewFaceSnap() {
        this.router.navigateByUrl(`facesnaps/${this.faceSnap.id}`)
    }

}

