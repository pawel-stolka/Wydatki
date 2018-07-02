import { Injectable } from '@angular/core';
import { Bill } from './models/Bill';

@Injectable()
export class DataService {
  groupBills: Bill[][]
  bills2: any[]

  constructor() { 
    this.groupBills = []
  }

  getBills() {
    console.log(this.groupBills)
    return this.groupBills
  }

  getBills2() {
    return this.bills2
  }
}
