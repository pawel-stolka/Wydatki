import { Injectable } from '@angular/core';
import { Bill } from './models/Bill';

@Injectable()
export class DataService {
  groupBills: Bill[][]

  constructor() { 
    this.groupBills = []
  }

  getBills() {
    console.log(this.groupBills)
    return this.groupBills
  }
}
