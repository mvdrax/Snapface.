import { Component, OnInit, OnDestroy } from '@angular/core';
import { FaceSnap } from '/Users/Administrateur/snapface/src/app/models/face-snap';
import { FaceSnapComponent } from '../face-snap/face-snap.component';
import { FaceSnapsService } from '../services/face-snap.services';
import { interval, Subject } from 'rxjs';
import { tap , take, takeUntil } from 'rxjs/operators';




@Component({
  selector: 'app-face-snap-list',
  standalone: true,
  imports: [FaceSnapComponent],
  templateUrl: './face-snap-list.component.html',
  styleUrl: './face-snap-list.component.scss'
})

export class FaceSnapListComponent implements OnInit, OnDestroy {
  faceSnaps!: FaceSnap[]; /*Cette ligne déclare une propriété faceSnaps de type FaceSnap (on met [] car il s'agira d'un tableau de valeurs)
  Le ! après  signifie que cette propriété sera initialisée ultérieurement
  (probablement dans ngOnInit) et qu'on peut ignorer l'erreur de TypeScript concernant l'initialisation obligatoire. */
  private destroy$!: Subject<boolean>;

  /*Un Subject est un Observable que vous pouvez faire émettre à la demande. Vous allez donc créer un Subject appelé  destroy$
  qui émettra une seule fois, au moment de la destruction du component.*/ 

  constructor(private faceSnapsService: FaceSnapsService) {}

  //Injecte FaceSnapsService pour que ce composant puisse accéder aux données des "FaceSnaps".

 ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.faceSnaps = this.faceSnapsService.getFaceSnaps();
       

    interval(1000).pipe(
      takeUntil(this.destroy$), /*Cet opérateur dit à l'Observable  interval  de continuer à émettre tant que  destroy$  n'a pas émis, mais dès que  destroy$
      émet, de compléter l'Observable. */
      tap(console.log)
    ).subscribe();
  /* this.faceSnaps = this.faceSnapsService.getFaceSnaps(); : Récupère les données des "FaceSnaps" en appelant getFaceSnaps() du service et les stocke dans faceSnaps.

this.faceSnaps[1].setLocation('à la montagne'); : Modifie la propriété de localisation d'un des "FaceSnaps" (ici le deuxième élément) pour qu'il soit "à la montagne".  */ 
}

ngOnDestroy(): void {
  this.destroy$.next(true);
}

}

/* QUAND ON NAVIGUE SUR LE SITE ON CONSTATE QUE LORSQUE L ON QUITTE LA PAGE DE FACECOMPONENT LIST , VERS L ACCUEIL OU VERS LES FACESNAPS L OPEARTEUR CESSE ET LE COMPTE S ARRETE?
EFFECTIVEMENT NOTRE OBSERVABLE A BIEN COMPLETE CAR FACE SNAP LIST COMPENENT A BIEN ETE DETRUIT */
