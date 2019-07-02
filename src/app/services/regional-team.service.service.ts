import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, pluck } from 'rxjs/operators';
import { Observable, from, combineLatest } from 'rxjs';
import { IExtraLifeUser, getTeamInfo } from 'extra-life-api';

export interface NerderyTeam {
  id: string;
  subTeams: SubTeam[];
  participants: Participant[];
  sponsors: Sponsor[];
  announcements: Announcement[];
}

export interface Announcement {
  text: string;
  subTeams: TeamRegion[];
}

export enum TeamRegion {
  Chi = 'CHI',
  Mn = 'MN',
}

export interface Participant {
  id: string;
  subTeams: TeamRegion[];
}

export interface Sponsor {
  name: string;
  url: string;
  image: string;
  subTeams: TeamRegion[];
  isFeatured: boolean;
}

export interface SubTeam {
  name: TeamRegion;
  fundraisingGoal: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegionalTeamService {
  private _urlBase = 'http://eldashboard.nerderylabs.com/team/';

  constructor(private http: HttpClient) { }

  public async getChicagoRoster(): Promise<IExtraLifeUser[]> {
    return new Promise<IExtraLifeUser[]>(async (resolve, reject) => {
      try {
        const [apiRoster, chiRosterNumbers] = await Promise.all([getTeamInfo(44504), this._getRawChicagoRoster().toPromise()]);
        const filteredRoster = apiRoster.members.filter(m => {
          const memberId = m.participantID.toString();
          return chiRosterNumbers.indexOf(memberId) !== -1;
        });
        resolve(filteredRoster);
      } catch (e) {
        reject([]);
      }
    });
  }

  public getChicagoDonations(): Observable<{goal: number, current: number}> {
    const chiFundraisingGoal$ =
      this.http.get<NerderyTeam>(this._getTeamUrl(38961))
        .pipe(pluck('subTeams'))
        .pipe(map(st => {
          const chi = st.find(t => t.name === TeamRegion.Chi);
          return chi.fundraisingGoal;
        }));
    const chicagoFundraisingCurrent$ =
      from(this.getChicagoRoster())
        .pipe(map(m => {
          const fundsRaisedChi = m.map(member => member.sumDonations);
          return fundsRaisedChi.reduce((a, b) => a + b, 0);
        }));
    return combineLatest(
      chiFundraisingGoal$,
      chicagoFundraisingCurrent$
    ).pipe(map(funds => {
      return {
        goal: parseInt(funds[0], 10),
        current: funds[1]
      };
    }));
  }

  public _getRawChicagoRoster(): Observable<string[]> {
    return this.http.get<NerderyTeam>(this._getTeamUrl(38961))
      .pipe(pluck('participants'))
      .pipe(map(partipicants => {
        const chiRoster = partipicants.filter(p => p.subTeams.indexOf(TeamRegion.Chi) !== -1);
        return chiRoster.map(cr => cr.id);
      }));
  }

  private _getTeamUrl(teamId: number): string {
    return `${this._urlBase}${teamId}.json`;
  }

}
