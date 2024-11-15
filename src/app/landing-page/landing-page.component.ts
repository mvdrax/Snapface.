import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';




@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,

  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  email: string = '';
  constructor(private router: Router) { }  // le router s'importe comme un service




  onContinue() {
  this.router.navigateByUrl('facesnaps');
  }

  onSubmitForm(form: NgForm) { 
    console.log(form.value);
  }

}

/*onSubmitForm() est une méthode publique de votre composant. Elle est déclenchée lorsque l'utilisateur soumet le formulaire
 grâce à l'attribut (ngSubmit)="onSubmitForm()" défini dans le HTML.Le système de formulaires template  permet de passer le
 formulaire complet en argument comme NgForm

   NgForm est un type d'argument et ngForm est une directive, c  ette directive est appliquée automatiquement à toutes les balises  form  par Angular, et
   ici vous créez une référence à la directive pour la passer à la méthode  onSubmitForm()  .
   C'est cette directive qui vous donne accès à l'attribut  value  , entre autres.
  

   Le type  NgForm  expose un attribut  value  qui correspond à un objet contenant les champs du formulaire avec leur attribut  name  et les valeurs contenues
   dans ces champs.Pour récupérer le  NgForm  correspondant à votre formulaire, vous allez utiliser une référence locale :

<form #emailForm="ngForm" (ngSubmit)="onSubmitForm(emailForm)">

Une référence locale, créée avec un dièse  #  comme ci-dessus, permet à Angular d'accéder à l'élément pour, par exemple, l'envoyer comme argument à une méthode comme fait ici.
 */
