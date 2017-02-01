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



  chartType:string;
	configData:any;
  geoMapDataJson:any;

  lineTypeName:string;
  geoMapTypeName:string;

  constructor() {
	  this.geoMapTypeName = "geoMap";

		this.initilizeData();
	}

  ngOnInit() {
    // give everything a chance to get loaded before starting the animation to reduce choppiness
    setTimeout(() => {
      this.generateData();

      // change the data periodically
      setInterval(() => this.generateData(), 3000);
    }, 1000);
  }

  generateData() {
    // this.chartData = [];
    // for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
    //   this.chartData.push([
    //     `Index ${i}`,
    //     Math.floor(Math.random() * 100)
    //   ]);
    // }
    // console.log(this.chartData)

    this.chartData = [["eighteentwenties", 128502],
  	["eighteenthirties", 538381],
  	["eighteenfourties", 1427337],
  	["eighteenfifties", 2814554],
  	["eighteensixties", 2081261],
  	["eighteenseventies", 2742137],
  	["eighteeneighties", 5248568],
  	["eighteennineties", 3694294],
  	["nineteentens", 8202388],
  	["nineteens", 6347380],
  	["nineteentwenties", 4295510],
  	["nineteenthirties", 699375],
  	["nineteenfourties", 856608],
  	["nineteenfifties", 2499268],
  	["nineteensixties", 3213749],
  	["nineteenseventies", 4248203],
  	["nineteeneighties", 6244379],
  	["nineteennineties", 9775398],
  	["twothousands", 10299430],
  	["twentyten", 1042625],
  	["twentyeleven", 1062040],
  	["twentytwelve", 1031631],
  	["twentythirteen", 990553],
  	["twentyfourteen", 1016518],
  	["twentyfifteen", 1051031]]
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
        "targetPropertyName":"properties.ADMIN",
    },
    "data":[
      {
        "name":"Australia",
        "color":"black"
      },
      {
        "name":"Antarctica",
        "color":"white"
      },
      {
        "name":"Japan",
        "color":"blue"
      },
      {
        "name": "United States",
        "color": "pink"
      }
    ],
  };
  }
}
