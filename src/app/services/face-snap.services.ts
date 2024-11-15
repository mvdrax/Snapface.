import { Injectable } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { SnapType } from '../models/snap-type.type';


@Injectable({
  providedIn: 'root'    /* L'objet de configuration qui spécifie  providedIn: 'root'
                         dit à Angular d'enregistrer ce service à la racine de l'application */

})
export class FaceSnapsService {

  //faceSnaps est un tableau privé de FaceSnap, contenant des instances de FaceSnap en tant qu'objets.
  private faceSnaps: FaceSnap[] = [
    new FaceSnap(
      'Archibald',
      'Mon meilleur ami depuis tout petit !',
      'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
      new Date(),
      0
    ),
    new FaceSnap(
      'Mili',
      'Peluche',
      'https://galaxie-peluche.com/cdn/shop/products/Peluche-Chat-Kawaii-Galaxie-Peluche_720x.jpg?v=1680172633',
      new Date(),
      156
    ).withLocation('à la montagne'),
  ];

  getFaceSnaps(): FaceSnap[] {
    return [...this.faceSnaps];
  }
  //Cette méthode renvoie une copie du tableau faceSnaps en utilisant la syntaxe [...].
  //Cela protège le tableau original contre toute modification non voulue,
  //permettant aux composants d'obtenir les données sans les altérer directement.

   getFaceSnapById(faceSnapId: string): FaceSnap {
    const foundFaceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === faceSnapId); //Cette méthode prend un identifiant faceSnapId et cherche dans le tableau
                                                                                        //faceSnaps un FaceSnap dont l'identifiant correspond à faceSnapId.
    if (!foundFaceSnap) {
      throw new Error('FaceSnap not found!');
    }
    return foundFaceSnap;
  }

  snapFaceSnapById(faceSnapId: string, snapType: SnapType): void {
    const faceSnap : FaceSnap = this.getFaceSnapById(faceSnapId);
    faceSnap.snap(snapType);
}


/*Cette méthode prend un faceSnapId et un snapType en argument.
Elle utilise getFaceSnapById(faceSnapId) pour récupérer le FaceSnap correspondant à l'identifiant.
Elle appelle ensuite la méthode snap(snapType) sur cet objet FaceSnap. Cette méthode snap, définie dans la classe FaceSnap,
gère probablement l'incrément ou le décrément du compteur de "snaps" en fonction du snapType.*/

  addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string }): void {
    const faceSnap = new FaceSnap(
      formValue.title,
      formValue.description,
      formValue.imageUrl,
      new Date(), // createdAt
      0           // initial snaps count
    );

    // Set location if provided in the form value
    if (formValue.location) {
      faceSnap.setLocation(formValue.location);
    }

    this.faceSnaps.push(faceSnap);
  }


}

