import { Component, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { FaceSnapsService } from '../services/face-snap.services';
import { NgStyle, NgClass, UpperCasePipe, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';



@Component({
  selector: 'app-single-face-snap',
  standalone: true,
  imports: [
    NgStyle,
    NgClass,
    UpperCasePipe,
    DatePipe,
    RouterLink
  ],
  templateUrl: './single-face-snap-component.html',
  styleUrl: './single-face-snap-component.scss'
})
export class SingleFaceSnapComponent implements OnInit {
  faceSnap!: FaceSnap; //propriété de type
 
  snapButtonText!: string; //propriété de type  
  userHasSnapped!: boolean; //propriété de type

  constructor(private faceSnapsService: FaceSnapsService,
    private route: ActivatedRoute) { }  /*The constructor injects dependencies needed in this component:
  faceSnapsService: Used to retrieve or manipulate FaceSnap data.
  route: Provides access to route parameters(like the FaceSnap ID from the URL).*/

  
  ngOnInit(): void {
    this.prepareInterface();
    this.getFaceSnap();
  }
  /* ngOnInit est une méthode du cycle de vie d'un composant Angular. Elle est appelée une fois que
    tous les composants du composant ont été initialisés, c'est-à-dire que tous les data-bindings sont prêts*/
  //ngOnInit: Runs once the component is fully initialized. Here, it calls two functions

  private prepareInterface() { //prepareInterface: Sets initial values for snapButtonText and userHasSnapped
    this.snapButtonText = 'Oh Snap!';
    this.userHasSnapped = false;
  }


    private getFaceSnap() { //méthode qui récupère l'id du facesnap et le facesnap correspondant
      const faceSnapId = this.route.snapshot.params['id']; //snapshot représente un aperçu instantané des paramètres de la route au moment où le composant est initialisé
      //                                                     Cette ligne extrait l'identifiant du FaceSnap depuis les paramètres de l'URL, en utilisant this.route.snapshot.params['id'].
      this.faceSnap = this.faceSnapsService.getFaceSnapById(faceSnapId);//la méthode appelle getFaceSnapById du service faceSnapsService pour récupérer le FaceSnap correspondant
                                                                        //à faceSnapId et le stocke dans la propriété this.faceSnap.
  }

    
  
  onSnap(): void {
    if (this.userHasSnapped) {
      this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'unsnap');
      this.snapButtonText = 'Oh Snap!';
      this.userHasSnapped = false;
    } else {
      this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'snap');
      this.snapButtonText = 'Oops, unSnap!';
      this.userHasSnapped = true;
    }
  }
}
