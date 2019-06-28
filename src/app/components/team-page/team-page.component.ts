import { Component, OnInit } from '@angular/core';
import { getTeamInfo, getTeamRoster, IRosterList, IExtraLifeTeam, getUserInfo, IExtraLifeUser } from 'extra-life-api';
import { AsyncApiCallHelperService } from 'src/app/services/async-ssr-helper.service';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {
  public team: IExtraLifeTeam;
  public roster: IExtraLifeUser[] = [];

  constructor(private processor: AsyncApiCallHelperService) { }

  async ngOnInit() {
    try {
      this.processor
        .doTask(getTeamInfo(44504))
        .subscribe(result => {
          this.team = result;
          this.roster = this.team.members;
        });
    } catch (e) {
      console.log(e);
    }
  }
}
