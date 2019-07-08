import { Component, OnInit } from '@angular/core';
import { getTeamInfo, getTeamRoster, IRosterList, IExtraLifeTeam, getUserInfo, IExtraLifeUser } from 'extra-life-api';
import { AsyncApiCallHelperService } from 'src/app/services/async-ssr-helper.service';
import { RegionalTeamService } from 'src/app/services/regional-team.service.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppStore } from 'src/app/ngrx/reducers/root.reducer';
import { updateTeam } from 'src/app/ngrx/actions/team.actions';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {
  public roster: Observable<IExtraLifeUser[]>;;

  constructor(
    private processor: AsyncApiCallHelperService,
    private regionalService: RegionalTeamService,
    private store: Store<{app: AppStore}>) { }

  async ngOnInit() {
    this.roster = this.store.select('app', 'team', 'roster');
    try {
      this.processor
        .doTask(this.regionalService.getChicagoRoster())
        .subscribe(result => {
          this.store.dispatch(updateTeam({payload: {roster: result}}));
        });
    } catch (e) {
      console.log(e);
    }
  }
}
