import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MissionPageComponent } from './components/mission-page/mission-page.component';
import { TeamPageComponent } from './components/team-page/team-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'mission', component: MissionPageComponent },
  { path: 'team', component: TeamPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
