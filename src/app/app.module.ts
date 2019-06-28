import { BrowserModule, Meta, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { MissionPageComponent } from './components/mission-page/mission-page.component';
import { TeamPageComponent } from './components/team-page/team-page.component';

import { AsyncApiCallHelperService } from './services/async-ssr-helper.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    FooterComponent,
    MissionPageComponent,
    TeamPageComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
  ],
  providers: [
    AsyncApiCallHelperService,
    Meta,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
