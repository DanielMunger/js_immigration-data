import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent {
  title = 'app works!';


  chartType:string;
	configData:any;
  geoMapDataJson:any;

  lineTypeName:string;
  geoMapTypeName:string;

  constructor() {
	  this.geoMapTypeName = "geoMap";

		this.initilizeData();
	}


private initilizeData(){
  this.configData ={
    "className":{
      "axis":"axis",
      "axisXBorder":"axis_x",
      "axisXText":"axis-x-text",
      "bar":"bar",
      "barValue":"bar-value",
      "line":"line",
      "multiLinePrefix":"line-",
      "grid":"grid",
      "pie":"pie",
      "pieInnerTitle": "pie-inner-title",
      "pieInnerRadius":"total",
      "histogram":"histogram",
      "histogramBar":"histogram-bar",
      "treemap":"treemap",
      "treemapLabel":"treemap-label",
      "packlayout":"packlayout",
      "packlayoutLabel":"packlayout-label",
    },
    "label": {
        "display":true,
    },
    "title": {
      "display": true,
      "name":"Title",
      "className":"chart-title",
      "height":30,
      "leftMargin":-20,
      "bottomMargin":10
    },
    "maxValue":{
      "auto":true,
      "x":100,
      "y":100,
    },
    "legend": {
      "display": true,
      "position": "right",
      "totalWidth":80,
      "initXPos":5,
      "initYPos":10,
      "rectWidth":10,
      "rectHeight":10,
      "xSpacing":2,
      "ySpacing":2
    },
    "color":{
      "auto":true, //
      "defaultColorNumber":10,
      "opacity":1.0,
      "userColors":[
        "blue",
        "red",
        "green",
        "yellow",
        "PaleGoldenrod",
        "Khaki",
        "DarkKhaki",
        "Gold",
        "Cornsilk",
        "BlanchedAlmond",
        "Bisque",
        "NavajoWhite",
        "Wheat",
        "BurlyWood",
        "Tan",
        "RosyBrown",
        "SandyBrown",
        "Goldenrod",
        "DarkGoldenrod",
        "Peru",
        "Chocolate"
      ],
      "focusColor":"red",
    },
    "line": {
      "legend":"lineEnd",
      "interpolate" :"linear",
    },
    "grid":{
      "x":{
        "display":true,
      },
      "y":{
        "display":true,
      },
    },
    "margin":{
      "top":30,
      "left":30,
      "right":10,
      "bottom":20,
      "between":5
    },
    "axis":{
      "rotation":0,
      "borderLineWidth":1,
      "xLabel":{
        "leftMargin":0,
        "bottomMargin":5
      },
      "yLabel":{
        "leftMargin":0,
        "bottomMargin":0
      },

    },
  };




  this.geoMapDataJson =
  {
    "map":{
        "baseGeoDataUrl":"https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson",
        "scale":150,
        "keyDataName":"features",
        "targetPropertyName":"properties.name",
    },
    // "data":[
    //   {
    //     "name":"Australia",
    //     "color":"green"
    //   },
    //   {
    //     "name":"Antarctica",
    //     "color":"white"
    //   },
    //   {
    //     "name":"Japan",
    //     "color":"blue"
    //   },
    //   {
    //     "name": "United States",
    //     "color": "#0c54c9"
    //   }
    //],
  };
  }
}
