import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

interface IDotaPlayer {
  account_id: number;
  player_slot: number;
  hero_id: number;
  item_0: number;
  item_1: number;
  item_2: number;
  item_3: number;
  item_4: number;
  item_5: number;
  backpack_0: number;
  backpack_1: number;
  backpack_2: number;
  kills: number;
  deaths: number;
  assists: number;
  leaver_status: number;
  last_hits: number;
  denies: number;
  gold_per_min: number;
  xp_per_min: number;
  level: number;
}

interface IDotaMatch {
  result: {
    players: IDotaPlayer[];
    radiant_win: boolean;
    duration: number;
    pre_game_duration: number;
    start_time: number;
    match_id: number;
    match_seq_num: number;
    tower_status_radiant: number;
    tower_status_dire: number;
    barracks_status_radiant: number;
    barracks_status_dire: number;
    cluster: number;
    first_blood_time: number;
    lobby_type: number;
    human_players: number;
    leagueid: number;
    positive_votes: number;
    negative_votes: number;
    game_mode: number;
    flags: number;
    engine: number;
    radiant_score: number;
    dire_score: number;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DotA 2 Statistics';
  sample_url = 'http://localhost:3000/getnews';
  match_id = '27110133';
  private httpClient: HttpClient;
  match: Observable<IDotaMatch>;
  winner: string;
  duration: string  = "";
  fbtime: string = "";

  constructor(httpClient: HttpClient) {
    // Test Data:
    this.httpClient = httpClient;
    this.getData();
  }

  getData() {
    this.match = this.httpClient.get<IDotaMatch>(this.sample_url);
    //{headers: new HttpHeaders().set('match-id', this.match_id)}
    this.match.subscribe(match => {
      console.log("responded");
      if (match.result.radiant_win) {
        this.winner = "Radiant";
      } else {
        this.winner = "Dire";
      }
      this.duration = match.result.duration/100 + " min";
      this.fbtime = match.result.first_blood_time/60 + "min";
    })
  }

}
