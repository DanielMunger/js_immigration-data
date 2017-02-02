import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { D3GraphComponent } from './d3-graph/d3-graph.component';
import { routing } from './app.routing';


import { masterFirebaseConfig } from './api-keys';
import { AngularFireModule } from 'angularfire2';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { SplashComponent } from './splash/splash.component';
import { MapViewerComponent } from './map-viewer/map-viewer.component';

export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket
};

@NgModule({
  declarations: [
    AppComponent,
    D3GraphComponent,
    BarChartComponent,
    SplashComponent,
    MapViewerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routing
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
