


/*  utiliser un modèle de données  FaceSnap, qui comporte toutes les propriétés, et
que pourrait être injecté directement dans  FaceSnapComponent, et
même utilisé partout dans notre application */

import { SnapType } from "./snap-type.type";

export class FaceSnap {

  location?: string; /*valeur non obligatoire */
  id: string;


  constructor(public title: string,
    public description: string,
    public imageUrl: string,
    public createdAt: Date,
    public snaps: number)

  {
    this.id = crypto.randomUUID().substring(0, 8);
    console.log(this);
}
  //UUID est une chaîne de caractères suffisamment long pour garantir son unicité universelle. Pour notre application
  //c'est un peu du overkill, donc je vous propose de le tronquer à 8 caractères — largement suffisant pour notre cas !


  setLocation(location: string): void {
    this.location = location;
  }

  withLocation(location: string): FaceSnap {
    this.setLocation(location);
    return this;
  }
  addSnap(): void {
    this.snaps++;
}
  removeSnap(): void {
    this.snaps--;
  }

  snap(snapType: SnapType) {
    if (snapType === 'snap') {
      this.addSnap();
    } else if (snapType === 'unsnap') {
      this.removeSnap();
    }
  }

}

/*écrire ça revient à écrire: export class FaceSnap {
  title!: string;
  description!: string;
  createdDate!: Date;
  snaps!: number;
  imageUrl!: string;
  
  constructor(title: string, description: string, imageUrl: string, createdDate: Date, snaps: number) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.createdDate = createdDate;
    this.snaps = snaps;
  }
}

si on a des propriétés qui seront initialisées
par les arguments passés au constructor comme ci-dessus, on peut retirer
leurs déclarations et initialisations, et leur ajouter simplement le
modificateur  "public""  dans le  constructor

How the Constructor Works:
When a new instance of this class is created, you provide values for each property, and those values are assigned to the instance’s properties:

Parameters: The constructor has five parameters:

title: string: The title of the object.
description: string: The description of the object.
imageUrl: string: The URL of an image related to the object.
createdDate: Date: The date the object was created.
snaps: number: The initial snap count for the object.
Property Assignment: Inside the constructor, each parameter is assigned to the respective property of the instance:

this.title = title; assigns the title parameter to the title property of the instance (this refers to the current instance of the class).
Usage Example
Assuming this class is named FaceSnap, you could create a new instance as follows:

const newFaceSnap = new FaceSnap(
  "My Post Title",
  "This is a description of my post.",
  "https://example.com/image.jpg",
  new Date(),
  0
);


*/
