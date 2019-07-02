import { Component, OnInit } from '@angular/core';

import { AsyncApiCallHelperService } from 'src/app/services/async-ssr-helper.service';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { RegionalTeamService } from 'src/app/services/regional-team.service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public fundraising: { goal: number, current: number };

  constructor(
    private processor: AsyncApiCallHelperService,
    private meta: Meta,
    private title: Title,
    private regionalService: RegionalTeamService) { }

  ngOnInit() {
    this.processor
      .doTask(this.regionalService.getChicagoDonations().toPromise())
      .subscribe(result => {
        console.log(result);
        this.fundraising = result;
        const descriptionTag: MetaDefinition = {
          name: 'description',
          content: `Extra Life Nerds have raised \$${this.fundraising.current} for charity!`
        };
        const fbDescriptionTag: MetaDefinition = {
          name: 'og:description',
          content: `Extra Life Nerds have raised \$${this.fundraising.current} for charity!`
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

  public getFillPercent(): string {
    if (this.fundraising) {
      const percentValue = (this.fundraising.current / this.fundraising.goal) * 100;
      return `${percentValue}%`;
    }

    return '0%';
  }

}
