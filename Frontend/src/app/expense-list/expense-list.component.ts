import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { Bill } from '../models/Bill';

@Component({
  selector: 'expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  bills: Bill[]

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    // this.bills = 
    this.expenseService.getBills()
      .subscribe((data: any) => {
        // let ordered = data.map(data => data)
        console.log(data.json())
        let _data = data.json()
        let _mapped = _data.map(x => ({
          // createdAt: x.createdAt,
          name: x.name,
          date: x.date.substr(0,10),
          fulldate: new Date(x.date),
          price: x.price,//.replace(",","."),
          extra: x.extra          
        }))
        console.log(_mapped)
        this.bills = _mapped // data.json()
      })
  }

}
