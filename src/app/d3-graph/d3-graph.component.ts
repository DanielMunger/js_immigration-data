import { Component, OnInit, ElementRef } from '@angular/core';
import { D3Service, D3, Selection } from 'd3-ng2-service'; // <-- import the D3 Service, the type alias for the d3 variable and the Selection interface


@Component({
  selector: 'app-d3-graph',
  templateUrl: './d3-graph.component.html',
  styleUrls: ['./d3-graph.component.css']
})
export class D3GraphComponent implements OnInit {
  private d3: D3;
  private parentNativeElement: any;

  constructor(element: ElementRef, d3Service: D3Service) {
    this.d3 = d3Service.getD3() // <-- obtain the d3 object from the D3 Service
    this.parentNativeElement = element.nativeElement;
  } 
  ngOnInit() {
    let d3 = this.d3; // <-- for convenience use a block scope variable
    let d3ParentElement: Selection<any, any, any, any>; // <-- Use the Selection interface (very basic here for illustration only)

  }

}
