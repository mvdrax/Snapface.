import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FaceSnap } from '../models/face-snap';
import { UpperCasePipe, DatePipe, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FaceSnapsService } from '../services/face-snap.services';




@Component({
  selector: 'app-new-face-snap',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DatePipe,
    UpperCasePipe,
    NgIf,
    CommonModule
  ],
  templateUrl: './new-face-snap.component.html',
  styleUrl: './new-face-snap.component.scss'
})
export class NewFaceSnapComponent implements OnInit {

    snapForm!: FormGroup; //variable snapForm de type FormGroup
    faceSnapPreview$!: Observable<FaceSnap>; // observable qui émet des objets de type FaceSnap (+$ car c un observable)
  urlRegex!: RegExp; //urlRegex : Contient une expression régulière pour valider les URLs entrées dans le champ imageUrl.


constructor(private formBuilder: FormBuilder, /* FormBuilder est un service d'Angular qui facilite la création de formulaires réactifs.
Ici, FormBuilder est injecté dans le constructeur en tant que dépendance, avec l’accessibilité définie par private:il sera uniquement accessible au sein de ce composant. */
  private faceSnapsService: FaceSnapsService,
  private router: Router /* La fonctionnalité souhaitée est que l'utilisateur soit redirigé après l'ajout du FaceSnap.
  Il faudra donc injecter FaceSnapsService et le Router dans NewFaceSnapComponent, et modifier l'implémentation de la méthode  onSubmitForm()   */
  ) { }




  ngOnInit(): void {
    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/; //Définition d’une expression régulière (regex) pour valider les URLs. 
    this.snapForm = this.formBuilder.group({ //crée un FormGroup appelé snapForm, qui contient plusieurs champs ou contrôles de formulaire (title, description, imageUrl, location).
      title: [null, Validators.required], //Ce champ est obligatoire ; le formulaire ne sera pas valide tant que title n'aura pas de valeur.
      description: [null, Validators.required],
      imageUrl: [null, [Validators.required, Validators.pattern(this.urlRegex)]], //pattern  est un Validator qui prend un argument,
      //donc on doit lui ajouter les parenthèses, contrairement à  required  .
      location: [null]
    }, {

      updateOn: 'blur'
    });

    this.faceSnapPreview$ = this.snapForm.valueChanges.pipe( //ValueChanges ets un observable qui va émettre tout l'objet de FormGroup à chaque fois qu'un des champs va changer
      map(formValue => ({                /*Le map renvoie un nouvel objet qui inclut :
                                                 ...formValue : toutes les valeurs actuelles du formulaire +
                                                  createdDate: new Date() : une date actuelle ajoutée à l'objet pour indiquer quand cet enregistrement a été créé.
                                                 snaps: 0 : initialisation d'un compteur de "snaps" (ou likes) à 0.
                                                         id: 0 : initialisation de l'id à 0 (ou un autre identifiant unique, si nécessaire).*/
        ...formValue,
        createdAt: new Date(),
        snaps: 0,
        id:0
      }))
    );
 }

onSubmitForm(): void {
  console.log(this.snapForm.value);
  this.faceSnapsService.addFaceSnap(this.snapForm.value);
  this.router.navigateByUrl('/facesnaps');
}



}

