import { BrowserModule, Meta, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { MissionPageComponent } from './components/mission-page/mission-page.component';
import { TeamPageComponent } from './components/team-page/team-page.component';

import { AsyncApiCallHelperService } from './services/async-ssr-helper.service';
import { RegionalTeamService } from './services/regional-team.service.service';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomePageComponent,
    MissionPageComponent,
    TeamPageComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
  ],
  providers: [
    AsyncApiCallHelperService,
    RegionalTeamService,
    Meta,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
