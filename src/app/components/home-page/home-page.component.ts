import { Component, OnInit } from '@angular/core';
import { getTeamInfo, IExtraLifeTeam } from 'extra-life-api';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public team: Observable<IExtraLifeTeam>;

  constructor() { }

  ngOnInit() {
    this.team = from(getTeamInfo(44504, false));
    this.team.subscribe();
  }

}
