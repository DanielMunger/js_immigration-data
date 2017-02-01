import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class DataService {
  data: FirebaseListObservable<any[]>;

  constructor(private angularFire: AngularFire) {
    this.data = angularFire.database.list('countries')
  }

  getData() {
    return this.data;
  }

}
