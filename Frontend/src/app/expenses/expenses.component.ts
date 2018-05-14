import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
  }

  submit(form) : void {
    // console.log(form.value);
    let _bill = {
      name: form.value.name,
      price: form.value.price.replace(",","."),
      date: form.value.date,
      extra: form.value.extra
    }
    
    console.log(_bill);
    this.expenseService.addBill(_bill)
    form.reset()
  }

}
