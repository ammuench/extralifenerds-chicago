import { Component, OnInit } from '@angular/core';
import { getTeamInfo, getTeamRoster, IRosterList, IExtraLifeTeam, getUserInfo, IExtraLifeUser } from 'extra-life-api';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {
  public team: IExtraLifeTeam;
  public roster: IExtraLifeUser[] = [];

  constructor() { }

  async ngOnInit() {
    try {
      this.team = await getTeamInfo('44504');
      this.roster = this.team.members;
    } catch (e) {
      console.log(e);
    }
  }
}
