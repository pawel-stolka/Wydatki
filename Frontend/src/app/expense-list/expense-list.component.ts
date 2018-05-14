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
        console.log(data)
        let ordered = data.map(data => data)
        console.log(ordered)
        this.bills = data.json()
      })
  }

}
