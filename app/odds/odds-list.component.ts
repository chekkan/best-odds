import { Component } from '@angular/core';
import { Odds, Team } from './odd.model';
import { OddsService } from './odds.service';
import * as _ from 'lodash';

@Component({
    selector: 'bo-odds',
    templateUrl: 'app/odds/odds-list.component.html',
    providers: [OddsService]
})

export class OddsListComponent {
    
    public teamOdds: Team[];

    constructor(private _oddsService: OddsService) {
    }

    ngOnInit(): void {
        this._oddsService.getOdds()
            .subscribe(odds => this.teamOdds = this.getBestOdds(odds));
    }

    getBestOdds(odds : Odds[]) : Team[] {
        var result = _.chain(odds)
            .groupBy("team")
            .toPairs()
            .map(function(currentItem) {
                return _.zipObject(["name", "odds"], currentItem);
            })
            .value();
        return <Team[]>result;
    }
}