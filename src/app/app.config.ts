import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ]
};








/*   DatePipe permet de formater les dates, et sans configuration fournit un formatage par défaut.
DatePipe fournit des configurations prédéfinies avec des noms comme  short,  longDate  ou  mediumTime
DatePipe permet également de personnaliser totalement le format d'affichage des dates avec des chaînes de
caractères qui encodent le format souhaité, par exemple  'à HH:mm, le d MMMM yyyy'   */
