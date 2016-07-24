import { Injectable } from '@angular/core';
import { Odds } from './odd.model';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Injectable()
export class OddsService {

    constructor(private _http: Http) {
    }

    getOdds(): Observable<Odds[]> {
        return Observable.forkJoin(
            this.getBetfairOdds(),
            this.getPaddyPowerOdds(),
            this.getSkyBetOdds()
        ).map((response:Odds[]) => _.flatten(response));
    }

    getBetfairOdds(): Observable<Odds[]> {
        return this._http.get('betfair.json')
            .map((response:Response) => <Odds[]>response.json())
            .map((obj:Odds[]) => _.map(obj, function(obj) {
                obj.provider = "betfair";
                return obj;
            }));
    }

    getPaddyPowerOdds(): Observable<Odds[]> {
        return this._http.get('paddypower.json')
            .map((response:Response) => <Odds[]>response.json())
            .map((obj:Odds[]) => _.map(obj, function(obj) {
                obj.provider = "paddypower";
                return obj;
            }));
    }

    getSkyBetOdds(): Observable<Odds[]> {
        return this._http.get('skybet.json')
            .map((response:Response) => <Odds[]>response.json())
            .map((obj:Odds[]) => _.map(obj, function(obj) {
                obj.provider = "skybet";
                return obj;
            }));;
    }
}