import { Component, OnInit } from '@angular/core';

import { AsyncApiCallHelperService } from 'src/app/services/async-ssr-helper.service';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { RegionalTeamService } from 'src/app/services/regional-team.service.service';
import { Store } from '@ngrx/store';
import { AppStore } from 'src/app/ngrx/reducers/root.reducer';
import { Observable } from 'rxjs';
import { DonationState } from 'src/app/ngrx/reducers/donations.reducer';
import { updateDonations } from 'src/app/ngrx/actions/donations.actions';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public fundraising$: Observable<DonationState>;
  private fundraisingStatic: DonationState;

  constructor(
    private processor: AsyncApiCallHelperService,
    private meta: Meta,
    private title: Title,
    private regionalService: RegionalTeamService,
    private store: Store<{app: AppStore}>) { }

  ngOnInit() {
    this.fundraising$ = this.store.select('app', 'donations');
    this.processor
      .doTask(this.regionalService.getChicagoDonations().toPromise())
      .subscribe(result => {
        this.store.dispatch(updateDonations({payload: result}));
        this.fundraisingStatic = result;
        const descriptionTag: MetaDefinition = {
          name: 'description',
          content: `Extra Life Nerds have raised \$${result.current} for charity!`
        };
        const fbDescriptionTag: MetaDefinition = {
          name: 'og:description',
          content: `Extra Life Nerds have raised \$${result.current} for charity!`
        };
        const titleTag: MetaDefinition = {
          name: 'og:title',
          content: `extra life nerds`
        };
        const urlTag: MetaDefinition = {
          name: 'og:url',
          content: `http://nguni.alexmuen.ch`
        };
        this.title.setTitle('extra life nerds');
        this.meta.addTags([descriptionTag]);
      });
  }

  public getFillPercent(current: number, goal: number): string {
    if (goal !== 0) {
      const percentValue = (current / goal) * 100;
      return `${percentValue}%`;
    }

    return '0%';
  }

}
