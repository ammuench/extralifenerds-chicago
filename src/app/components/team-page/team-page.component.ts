import { Component, OnInit } from '@angular/core';
import { getTeamInfo, getTeamRoster, IRosterList, IExtraLifeTeam, getUserInfo, IExtraLifeUser } from 'extra-life-api';
import { AsyncApiCallHelperService } from 'src/app/services/async-ssr-helper.service';
import { RegionalTeamService } from 'src/app/services/regional-team.service.service';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {
  public roster: IExtraLifeUser[] = [];

  constructor(private processor: AsyncApiCallHelperService, private regionalService: RegionalTeamService) { }

  async ngOnInit() {
    try {
      this.processor
        .doTask(this.regionalService.getChicagoRoster())
        .subscribe(result => {
          this.roster = result;
        });
    } catch (e) {
      console.log(e);
    }
  }
}
