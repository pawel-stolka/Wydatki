import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Bill } from './models/Bill';

@Injectable()
export class ExpenseService {
  url = 'http://localhost:7000'
  error

  constructor(private http: Http) { }

  ngOnInit() {
    this.getBills()
  }

  getBills() {
    return this.http.get(`${this.url}/bills`)
  }

  addBill(bill: Bill) {
    return this.http.post(`${this.url}/bill`, bill)
  }

  getNames() {
    return this.http.get(`${this.url}/name`)
  }

  getName(name) {
    return this.http.get(`${this.url}/name/${name}`)
  }

  getTypes() {
    return this.http.get(`${this.url}/type`)
      // .toPromise()
      // .then(this.extractData)
      // .catch(this.handleError)
  }

  getType(type) {
    return this.http.get(`${this.url}/type/${type}`)
  }

  // private extractData(res: Response) {
  //   console.log(res.json())
  //   let body = res.json();
    
  //   return body || [];
  // }

  // private handleError(error: any): Promise<any> {
  //   // console.log('error', error)
  //   // this.error = error;
  //   console.error('An error occurred', error);
  //   return Promise.reject(error.message || error);
  // }

}
