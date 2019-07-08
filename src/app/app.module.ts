import { BrowserModule, Meta, Title, BrowserTransferStateModule, TransferState, makeStateKey } from '@angular/platform-browser';
import { NgModule, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule, Store } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { rootReducer, AppStore } from './ngrx/reducers/root.reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { MissionPageComponent } from './components/mission-page/mission-page.component';
import { TeamPageComponent } from './components/team-page/team-page.component';

import { AsyncApiCallHelperService } from './services/async-ssr-helper.service';
import { RegionalTeamService } from './services/regional-team.service.service';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { hydrate } from './ngrx/actions/root.actions';

const SERVERSIDE_STORE = makeStateKey('SERVERSIDE_STORE');

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
    BrowserTransferStateModule,
    HttpClientModule,
    StoreModule.forRoot({
      app: rootReducer,
      router: routerReducer,
    }),
    StoreDevtoolsModule.instrument(),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    AsyncApiCallHelperService,
    RegionalTeamService,
    Meta,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platform: object,
    private store: Store<{app: AppStore}>,
    private tState: TransferState,
  ) {
    if (isPlatformServer(platform)) {
      store.subscribe(
        ngrxStore => {
          tState.set(SERVERSIDE_STORE, ngrxStore.app);
        }
      );
    }

    if (isPlatformBrowser(platform)) {
      const hydratedState = tState.get(SERVERSIDE_STORE, null as any);
      console.log(hydratedState);
      if (!!hydratedState) {
        store.dispatch(hydrate({ payload: hydratedState }));
        tState.remove(SERVERSIDE_STORE);
      }
    }
  }
}
