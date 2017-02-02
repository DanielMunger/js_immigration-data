// import {ChartConst} from './chart-const';
import * as d3  from 'd3';

export class O2Common {


    constructor(
        public svgContainer: any,
        public configData: any,
        public autoMaxX: number,
        public autoMaxY: number,
        public svgWidth: number,
        public svgHeight: number
    ) { }


// -------------------------------------------
// ----  CLASS NAME  -------------------------
// -------------------------------------------

    public get axisClassName(): string {
        return this.configData.className.axis;
    }

    public get lineClassName(): string {
        return this.configData.className.line;
    }

    public get axisXBorderLineClassName(): string {
        return this.configData.className.axisXBorder;
    }



// -------------------------------------------
// ----  MAX VALUE  --------------------------
// -------------------------------------------

    public get maxXValue():number{
        let _maxX = this.autoMaxX;
        if (!this.configData.maxValue.auto){
            _maxX = this.configData.maxValue.x
        }
        return _maxX;
    }

    public get maxYValue():number{
        let _maxY = this.autoMaxY;
        if (!this.configData.maxValue.auto){
            _maxY = this.configData.maxValue.y
        }
        return _maxY;
    }

// -------------------------------------------
// ----  GRAPH -------------------------------
// -------------------------------------------

    public get graphInitXPos() : number {
        let _intX = this.configData.margin.left
        if (this.configData.legend.display && this.configData.legend.position !="right"){
            _intX = this.configData.margin.left
                        + this.configData.legend.totalWidth;
        }
        return _intX;
    }

    public get graphInitYPos() : number {
        let _intY = this.configData.margin.top
                    +this.configData.title.height;
        return _intY;
    }

    public get graphYScale() : number {
        return this.graphHeight / this.maxYValue;
    }

    public get graphXScale() : number {
        return this.graphWidth / this.maxXValue;
    }

    public get graphWidth(): number {

        return this.svgWidth
    }

    public get graphHeight(): number {
        let _h = this.svgHeight

        return _h;
    }

    public get graphCenterPos(): any {
        let _xyArray:Array<number> = new Array();
        let _x = this.configData.margin.left
                    +this.graphWidth/2;
        let _y = this.configData.margin.top
                +this.configData.title.height
                +this.graphHeight/2;
        _xyArray.push(_x);
        _xyArray.push(_y);
        return _xyArray;
    }

    public get graphCenterTranslatePos(): string {
        let _x = this.configData.margin.left
                    +this.graphWidth/2;
        let _y = this.configData.margin.top
                +this.configData.title.height
                +this.graphHeight/2;
        return "translate("+ String(_x) +", "+ String(_y)+")";
    }

    public get graphInitTranslatePos(): string {
        let _x = this.graphInitXPos;
        let _y = this.graphInitYPos;
        return "translate("+ String(_x) +", "+ String(_y)+")";
    }


}

export class O2LegendData {
    constructor(
       public title: string,
	   public color: string ) { }

}
