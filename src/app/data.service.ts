import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class DataService {
  data: FirebaseListObservable<any[]>;
  dataNum: FirebaseListObservable<any[]>;

  constructor(private angularFire: AngularFire) {
    this.data = angularFire.database.list('countries')
    this.dataNum = angularFire.database.list('countries-numbers')
  }

  getData() {
    return this.data;
  }

  getDataNum() {
    return this.dataNum;
  }

  getDataById() {

  }
}
