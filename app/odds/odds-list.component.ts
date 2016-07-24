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
        var grouped = <Team[]>_.chain(odds)
            .groupBy("team")
            .toPairs()
            .map(function(currentItem) {
                return _.zipObject(["name", "other_odds"], currentItem);
            })
            .value();

        return _.map(grouped, function(item){
            item.best_back_odds = _.maxBy(item.other_odds, 'back_odds').back_odds;
            var maxObject =_.maxBy(item.other_odds, 'lay_odds');
            item.best_lay_odds = maxObject == undefined ? undefined : maxObject.lay_odds;
            return item; 
        });
    }
}