import { Component, OnInit, NgZone } from '@angular/core';
import { getTeamInfo, IExtraLifeTeam } from 'extra-life-api';
import { from, Observable } from 'rxjs';
import { AsyncApiCallHelperService } from 'src/app/services/async-ssr-helper.service';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public team: IExtraLifeTeam;

  constructor(private processor: AsyncApiCallHelperService, private meta: Meta, private title: Title) { }

  ngOnInit() {
    // this.team = from(getTeamInfo(44504, false));
    // this.team.subscribe();

    this.processor
        .doTask(getTeamInfo(44504, false))
        .subscribe(result => {
          this.team = result;
          const descriptionTag: MetaDefinition = {
            name: 'description',
            content: `Extra Life Nerds have raised \$${this.team.sumDonations} for charity!`
          };
          const fbDescriptionTag: MetaDefinition = {
            name: 'og:description',
            content: `Extra Life Nerds have raised \$${this.team.sumDonations} for charity!`
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

}
