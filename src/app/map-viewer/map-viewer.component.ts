import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FirebaseListObservable, AngularFire } from 'angularfire2';
@Component({
  selector: 'app-map-viewer',
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.css'],
  providers: [DataService]
})
export class MapViewerComponent implements OnInit {
  public chartData: Array<any>;
  public countryName: string
  ImmigrationDataset: FirebaseListObservable<any[]>;



  chartType:string;
	configData:any;
  geoMapDataJson:any;

  lineTypeName:string;
  geoMapTypeName:string;

  constructor(private dataService: DataService) { 

    this.geoMapTypeName = "geoMap";
    this.configData = {
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
        
    this.geoMapDataJson = {
      "map":{
        "baseGeoDataUrl":"https://raw.githubusercontent.com/Solgo/js_immigration-data/munger-1/src/geographies.geojson",
        "scale":150,
        "keyDataName":"features",
        "targetPropertyName":"properties.ADMIN",
      }
    };
  }

  ngOnInit() {

  }
  getCountryData(country) {

    var immigrants;
    this.ImmigrationDataset = this.dataService.getDataNum();
    this.ImmigrationDataset.subscribe(
      result => {
        var currentCountry;
        var data_array = []
        immigrants = result;
        for(var i = 0;  i < immigrants.length; i++) {
          if(immigrants[i].clr === country) {
            currentCountry = immigrants[i]
          }
        }

        if (currentCountry === undefined){
          currentCountry = immigrants[0]
          this.countryName = "Total"
        }
        else {
          this.countryName = country

        }
        var keys = Object.keys(currentCountry);
        var twentyteens = 0;

        keys.forEach(function(key) {
          var key_value_array = []
          if(key === "2010" || key === "2011" || key === "2012" || key === "2013" || key === "2014" || key === "2015" ){
            twentyteens += currentCountry[key];
          }
          else {
            var value = currentCountry[key]
            key_value_array.push(key);
            key_value_array.push(value);
            data_array.push(key_value_array)
          }
        })
        var twentyteens_array = ["2010s", twentyteens]
        data_array.pop()
        data_array.pop()
        data_array.pop()
        data_array.push(twentyteens_array)
        this.chartData = data_array
      }
    )
  }
}