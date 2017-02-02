import { Component,Directive,Input, OnInit,Inject,ElementRef, EventEmitter } from '@angular/core';
import {Output,OnChanges, SimpleChange} from '@angular/core';
import {O2Common,O2LegendData} from './shared/common';
import {ChartConst} from './shared/chart-const';
import { DataService } from '../data.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import * as d3 from 'd3';

@Component({
  selector: 'app-d3-graph',
  templateUrl: './d3-graph.component.html',
  styleUrls: ['./d3-graph.component.css'],
  providers: [DataService]
})

export class D3GraphComponent implements OnInit{

  chartType = "geoMapType";
  svgWidth = "1200";
  svgHeight = "800";
  @Input() graphData:Array<number>;
  @Input() configData:any;
  @Output() changeCountry = new EventEmitter();

  yearSelected = 1820;

  root: any;
  ImmigrationDataset: FirebaseListObservable<any[]>;
  immigrants;

  _maxX = 100; //any value
  _maxY = 100; //any value

  constructor(private dataService: DataService, elementRef: ElementRef )
  {
    let el:HTMLElement = elementRef.nativeElement;
    this.root = d3.select(el);
  }

  ngOnInit() {

    this.ImmigrationDataset = this.dataService.getData();

    this.ImmigrationDataset.subscribe(
      result => {
        this.immigrants = result;
        let svgWidth = parseInt(this.svgWidth);
        let svgHeight = parseInt(this.svgHeight);
        var dataSet = this.graphData;
        let configData = this.configData;
        let chartType = this.chartType;
        this.buildGeoMap(configData, dataSet,svgWidth,svgHeight, this.immigrants, this.yearSelected);
      });
  }

  private clearSVG(){
    d3.select("svg").remove();
  }

  private buildGeoMap(configData:any, dataSetJson: any, svgWidth: number, svgHeight: number, immigrants, inputYearSelected){

    var svgContainer = this.root.append("svg").attr("viewBox", "0 0 1200 800");
    if(immigrants===null)
    {immigrants=this.immigrants}
    var yearSelected = inputYearSelected;
    var countryIterator = 0;
    let _maxX = 100; //any value
    let _maxY = 100; //any value
    let cdt = new O2Common(svgContainer,configData,_maxX,_maxY,svgWidth,svgHeight);
    let _graphCenterPos = cdt.graphCenterPos;
    let _geoMapDataUrl =  dataSetJson.map.baseGeoDataUrl;
    let _scale = dataSetJson.map.scale;
    let _keyDataName = dataSetJson.map.keyDataName;
    let _keyName = "data."+_keyDataName;
    let _targetProperty = "d."+dataSetJson.map.targetPropertyName;
    let path = d3.geoPath().projection(d3.geoMercator().translate(_graphCenterPos).scale(_scale))

    function colorByImmigration(country, yearSelected) {
      var inDB = false;
      var index = null;
      if(country === "United States of America")return "#0D4F8B";

      for(var i = 0; i < immigrants.length; i++) {
        if(country == immigrants[i].clr){
          inDB = true;
          index = i;
        }
      }
        if(inDB){
          return immigrationIntensity(returnDataByPeriod(immigrants[index], yearSelected));
        }
        else{
          return "#B7C3D0";
      }
    }

    function returnDataByPeriod(country, period){
      if(period < 1830){
        return country.eighteentwenties;
      }
      if(period < 1840){
        return country.eighteenthirties;
      }
      if(period < 1850){
        return country.eighteenfourties
      }
      if(period < 1860){
        return country.eighteenfifties
      }
      if(period < 1870){
        return country.eighteensixties
      }
      if(period < 1880){
        return country.eighteenseventies
      }
      if(period < 1890){
        return country.eighteeneighties
      }
      if(period < 1900){
        return country.eighteennineties
      }
      if(period < 1910){
        return country.nineteentens
      }
      if(period < 1920){
        return country.nineteens
      }
      if(period < 1930){
        return country.nineteentwenties
      }
      if(period < 1940){
        return country.nineteenthirties
      }
      if(period < 1950){
        return country.nineteenfourties
      }
      if(period < 1960){
        return country.nineteenfifties
      }
      if(period < 1970){
        return country.nineteensixties
      }
      if(period < 1980){
        return country.nineteenseventies
      }
      if(period < 1990){
        return country.nineteeneighties
      }
      if(period < 2000){
        return country.nineteennineties
      }
      if(period < 2010){
        return country.twothousands
      }
      if(period = 2010){
        return country.twentyten
      }
      if(period = 2011){
        return country.twentyeleven
      }
      if(period = 2012){
        return country.twentytwelve
      }
      if(period = 2013){
        return country.twentythirteen
      }
      if(period = 2014){
        return country.twentyfourteen
      }
      if(period = 2015){
        return country.twentyfifteen
      }
    }

    function immigrationIntensity(input){
      if(input < 500){
        return "#f7fcfd";
      } else if (input < 5000 && input >= 500){
        return "#e5f5f9"
      } else if (input < 30000){
        return "#ccece6"
      }else if (input < 100000){
        return "#99d8c9"
      }else if (input < 300000){
        return "#66c2a4"
      }else if (input < 1000000){
        return "#41ae76"
      }else if (input < 2000000){
        return "#238b45"
      }else {
        return "#006d2c"
      }
    }

    d3.json(_geoMapDataUrl,(error,data) =>{
      svgContainer.selectAll("path")
        .data(eval(_keyName))
        .enter()
        .append("path")
        .attr("d",path)
        .style("fill",(d,i) => {
          let _targetArea = eval(_targetProperty);
          return colorByImmigration(_targetArea, yearSelected);
        })
        .attr("class", "country")
        .on('mouseover', (d, i) => {
            let _targetArea = (eval(_targetProperty))
            this.changeCountry.emit(_targetArea)
        })
      }
    )
  }
}
