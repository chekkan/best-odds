import { Component } from '@angular/core';
import { OddsListComponent } from './odds/odds-list.component';

@Component({
  selector: 'bo-app',
  templateUrl: 'app/app.component.html',
  directives: [ OddsListComponent ]
})

export class AppComponent { }
