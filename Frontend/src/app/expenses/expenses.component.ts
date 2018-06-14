import { Component, OnInit, ViewChild } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { FormControl, FormGroupDirective, Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms';

@Component({
  selector: 'expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  @ViewChild(FormGroupDirective) myForm;

  dateFormControl = new FormControl('', [ Validators.required ])
  nameFormControl = new FormControl('', [ Validators.required ])
  priceFormControl = new FormControl('', [ Validators.required ])
  extraFormControl = new FormControl('', [ ])

  complexGroup: FormGroup = new FormGroup({
    'dateFormControl': this.dateFormControl,
    'nameFormControl': this.nameFormControl,
    'priceFormControl': this.priceFormControl,
    'extraFormControl': this.extraFormControl
  })
  
  constructor(
    private expenseService: ExpenseService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  submitForm() {
    let expense = {
      date: this.complexGroup.value.dateFormControl,
      name: this.complexGroup.value.nameFormControl,
      price: this.complexGroup.value.priceFormControl,
      extra: this.complexGroup.value.extraFormControl
    }

    if (this.myForm) {
      this.myForm.resetForm();
    }

    this.expenseService.addBill(expense)
    console.log(expense)
  }

  // submit(form) : void {
  //   // console.log(form.value);
  //   let _bill = {
  //     name: form.value.name,
  //     price: form.value.price.replace(",","."),
  //     date: form.value.date,
  //     extra: form.value.extra
  //   }
    
  //   console.log(_bill);
  //   this.expenseService.addBill(_bill)
  //   form.reset()
  // }

}
