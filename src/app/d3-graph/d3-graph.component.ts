import { Component, OnInit, ElementRef } from '@angular/core';

import { DataService } from '../data.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-graph',
  templateUrl: './d3-graph.component.html',
  styleUrls: ['./d3-graph.component.css'],
  providers: [DataService]
})
export class D3GraphComponent implements OnInit {
  //private d3: D3;
  // private parentNativeElement: any;


  dataset: FirebaseListObservable<any[]>;

  constructor(private dataService: DataService) {
    // this.d3 = d3Service.getD3() // <-- obtain the d3 object from the D3 Service
    // this.parentNativeElement = element.nativeElement;
  }
  ngOnInit() {
    //let d3 = this.d3; // <-- for convenience use a block scope variable
    //et d3ParentElement: Selection<any, any, any, any>; // <-- Use the Selection interface (very basic here for illustration only)
    this.dataset = this.dataService.getData();


    d3.request("subunits.json", function(error, uk) {
      if (error) return console.error("hello");
      console.log(uk);
    });



  }



}
