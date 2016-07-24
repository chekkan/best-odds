import { Component } from "@angular/core";
import { HTTP_PROVIDERS } from "@angular/http";
import "rxjs/Rx"; // Load all features
import { OddsListComponent } from "./odds/odds-list.component";

@Component({
  selector: "bo-app",
  templateUrl: "app/app.component.html",
  directives: [ OddsListComponent ],
  providers: [HTTP_PROVIDERS]
})

export class AppComponent { }
