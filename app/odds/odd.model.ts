export class Team {
    name: string;
    best_back_odds: number;
    best_lay_odds: number;
    other_odds: Odds[];
}

export class Odds {
    provider: string;
    team: string;
    back_odds: number;
    lay_odds: number;
}