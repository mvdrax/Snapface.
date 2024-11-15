import { Component, OnInit } from '@angular/core'; /*on implémente  OnInit  pour pouvoir utiliser  ngOnInit()  dans AppComponent */ 
import { FaceSnap } from './models/face-snap';
import { FaceSnapListComponent } from './face-snap-list/face-snap-list.component';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';
import { interval, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { filter, map, tap, concatMap, mergeMap, delay, exhaustMap, switchMap, take } from 'rxjs/operators';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FaceSnapListComponent,
    HeaderComponent,
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
 faceSnaps!: FaceSnap[];

  interval$!: Observable<string>;

  redTrainsCalled = 0;
  yellowTrainsCalled = 0;

  ngOnInit() {
    /* const interval$ = interval(1000); // This is an RxJS function that returns an observable, emitting an incrementing
    number every specified number of milliseconds—in this case, every 1000ms (1 second).

    interval$.subscribe(value => console.log(value));
    By calling subscribe() on the observable, you initiate the process,
    so every second, the value emitted by the observable (starting from 0 and incrementing) will be logged to the console.
 */


/* this.interval$ = interval(1000).pipe(
    filter(value => value % 3 === 0), //filter doit être utilisé avant map car ses values sont en number obligaotirement mais après map les values sont string
    map(value => value % 2 === 0 ?
        `Je suis ${value} et je suis pair` :
        `Je suis ${value} et je suis impair`
    ),
    tap(text => this.logger(text)) // tap operator doesn’t change the emitted values; it simply performs an action with each value, allowing you to call the logger function for logging.
   );

  logger(text: string): void {
    console.log(`Log: ${text}`);
} */


   interval(500).pipe( //génère un observable qui émet un nombre incrémenté toutes les 500 millisecondes 
      take(20), //Le pipe take(10) limite le nombre d'émissions à 10. Cela signifie que le flux s'arrête après 10 ticks, soit après 5000 ms (10 x 500 ms).
      map(value => value % 2 === 0 ? 'rouge' : 'jaune'), //Cette opération convertit chaque nombre émis en une couleur
      tap(color => console.log(`La lumière s'allume en %c${color}`, `color: ${this.translateColor(color)}`)), /*tap est utilisé ici pour exécuter une action secondaire sans modifier les valeurs du
                                                                       flux. On logge un message à la console chaque fois qu'une couleur est émise.
                                                            La méthode translateColor(color) traduit 'rouge' en 'red' et 'jaune' en 'yellow' pour le style de console.*/
      switchMap(color => this.getTrainObservable$(color)), //mergeMap prend chaque couleur et la transforme en un observable de train via getTrainObservable$(color), cela
      // simule des trains qui peuvent arriver en parallèle avec des délais différents selon leur couleur.
      tap(train => console.log(`Train %c${train.color} ${train.trainIndex} arrivé !`, `font-weight: bold; color: ${this.translateColor(train.color)}`)) //Lorsque le train arrive (après son délai), tap l
      //logge son arrivée,en mettant en évidence sa couleur et son index via translateColor.
    ).subscribe();

  }

    getTrainObservable$(color: 'rouge' | 'jaune') {
    const isRedTrain = color === 'rouge';
    isRedTrain ? this.redTrainsCalled++ : this.yellowTrainsCalled++;
    const trainIndex = isRedTrain ? this.redTrainsCalled : this.yellowTrainsCalled; /* trainIndex est l'index du train actuel, en fonction de la couleur. Si le train est rouge,
                         trainIndex sera égal à this.redTrainsCalled; sinon, il sera égal à this.yellowTrainsCalled. Cela donne un identifiant unique à chaque train de chaque couleur.*/
    console.log(`Train %c${color} ${trainIndex} appelé !`, `text-decoration: underline; color: ${this.translateColor(color)}`);
    return of({ color, trainIndex }).pipe( //of({ color, trainIndex }) crée un observable qui émet un objet contenant color et trainIndex et .pipe(delay(...)) ajoute un délai avant l'émission
      delay(isRedTrain ? 5000 : 6000)
    );
  }

  translateColor(color: 'rouge' | 'jaune') {
    return color === 'rouge' ? 'red' : 'yellow';
  }






 }

/* Il ne faut pas oublier de  unsubscribe()  quand on n'a plus besoin de l'Observable, car sinon, on court le risque de créer des fuites de mémoire*/
//La méthode  interval()  permet de générer un Observable qui émet des nombres croissants ;
//La méthode  subscribe()  permet de souscrire à un Observable dans le code TypeScript ;
