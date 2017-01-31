import { Component,Directive,Input, OnInit,Inject,ElementRef } from '@angular/core';
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
export class D3GraphComponent implements OnInit, OnChanges {
  @Input() chartType:string;
  @Input() svgWidth:string;
  @Input() svgHeight:string;
  @Input() graphData:Array<number>;
  @Input() configData:any;



  root: any;
  ImmigrationDataset: FirebaseListObservable<any[]>;

  constructor(private dataService: DataService, elementRef: ElementRef )
  {
    let el:HTMLElement = elementRef.nativeElement;
    this.root = d3.select(el);
  }

  ngOnInit() {
    var immigrants;
    this.ImmigrationDataset = this.dataService.getData();
    console.log(this.ImmigrationDataset)
    this.ImmigrationDataset.subscribe(
        result => {
          immigrants = result;
          console.log("ONinit:", (immigrants));
          let svgWidth = parseInt(this.svgWidth);
          let svgHeight = parseInt(this.svgHeight);
          let dataSet = this.graphData;
          let configData = this.configData;
          let chartType = this.chartType;
          let svgContainer = this.root.append("svg")
                    .attr("width", svgWidth)
                    .attr("height", svgHeight);

          console.log(chartType);

          this.buildGeoMap(svgContainer,configData, dataSet,svgWidth,svgHeight, immigrants);
        });
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
    //
    // let svgWidth = parseInt(this.svgWidth);
    // let svgHeight = parseInt(this.svgHeight);
    // let dataSet = this.graphData;
    // let configData = this.configData;
    // let chartType = this.chartType;
    // let svgContainer = this.root.append("svg")
    //           .attr("width", svgWidth)
    //           .attr("height", svgHeight);
    //
    // console.log(chartType);
    //
    // this.buildGeoMap(svgContainer,configData, dataSet,svgWidth,svgHeight);

  }

  private buildGeoMap(svgContainer: any, configData:any,dataSetJson: any, svgWidth: number, svgHeight: number, immigrants){

        console.log("in buildGeoMap -------------------");
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
        //let _antarcticaColor = dataSetJson.map.antarcticaColor;
        let _legendDisplay = configData.legend.display

        let path = d3.geoPath()
                    .projection(
                        d3.geoMercator()
                        .translate(_graphCenterPos)
                        .scale(_scale)
                    )

        // let _findColorByName = (name:string):string => {
        //     for (let i in dataSetJson.data){
        //         if (name ==dataSetJson.data[i].name){
        //             let _color = dataSetJson.data[i].color;
        //             return _color;
        //         }
        //     }
        //     return null;
        // }
        function colorByImmigration(country)
        {
            var inDB = false;
            var index = null;

            for(var i = 0; i < immigrants.length; i++)
            {
                if(country == immigrants[i].clr){
                    inDB = true;
                    index = i;
                }
            }
                if(inDB){
                    return immigrationIntensity(immigrants[index].nineteenfourties);
                }
                else{
                    return "black";
                }

        }

        function immigrationIntensity(input){
            if(input > 10000){
                return "red";
            }
            else{
                return "blue";
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
                        return colorByImmigration(_targetArea);
                    })
            })


        // ------------------------------------
        // ---CALL buildLegend-----------------
        if (_legendDisplay){
            let _legendDataSet :Array<O2LegendData> = new Array();
            for (let i in dataSetJson.data) {
                let _name = dataSetJson.data[i].name;
                let _color = dataSetJson.data[i].color;
                if (_name== "Antarctica"){
                    continue;
                }
                _legendDataSet.push(new O2LegendData(dataSetJson.data[i].name,dataSetJson.data[i].color));
            }
            this.buildLegend(cdt,_legendDataSet);
        }


    }

    private buildLegend(o2Common: any,_legendDataSet: any):void{

        console.log("in buildLegend-------------------");

        // maxValues are meaningless

        let cdt = o2Common;
        let configData = cdt.configData;
        let svgContainer = cdt.svgContainer;
        // let cdt = new O2Common(configData,100,100,svgWidth,svgHeight);

        let legendRectSize = configData.legend.rectWidth;
        let legendSpacing = 10;
        let ySpacing = configData.legend.ySpacing;
        let initPosX = cdt.legendInitXPos;
        let initPosY = cdt.legendInitYPos;
        let opacity = configData.color.opacity;


        let grpLegend = svgContainer.append("g")
                    .selectAll("g")
                    .data(_legendDataSet)
                    .enter()
                    .append("g")
                    .attr("class","legend")
                    .attr("transform",(d:O2LegendData,i) =>{
                    let height = legendRectSize+ySpacing;
                    let x = initPosX;
                    let y = i * height+initPosY ;
                    return "translate(" +x+", "+y+")";
                    });

        grpLegend.append("rect")
            .attr("width",legendRectSize)
            .attr("height",legendRectSize)
            .style("fill",(d:O2LegendData,i) =>{
                return d.color;
            })
            .style("stroke",(d:O2LegendData,i) =>{
                return d.color;
            })
            .attr("fill-opacity", opacity);


        grpLegend.append("text")
            .attr("x",legendRectSize+legendSpacing)
            .attr("y",legendRectSize)
            .text((d:O2LegendData,i) =>{
                return d.title;
            })


    }

}
