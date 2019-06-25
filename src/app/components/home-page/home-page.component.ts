import { Component, OnInit, NgZone } from '@angular/core';
import { getTeamInfo } from 'extra-life-api';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public donationGoal = 0;
  public donationAmt = 0;

  constructor(private zone: NgZone) { }

  async ngOnInit() {
    // Process promise
    this.zone.run(async () => {
      const team = await getTeamInfo(44504, false);
      this.donationAmt = team.sumDonations;
      this.donationGoal = team.fundraisingGoal;

      console.log({
        amt: this.donationAmt,
        goal: this.donationGoal,
      });
    });
  }

}
