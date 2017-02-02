import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent {
  title = 'app works!';
  private chartData: Array<any>;
  private countryName: string
  ImmigrationDataset: FirebaseListObservable<any[]>;



  chartType:string;
	configData:any;
  geoMapDataJson:any;

  lineTypeName:string;
  geoMapTypeName:string;

  constructor(private dataService:DataService) {
	}

  ngOnInit() {

  }

}