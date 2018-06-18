import { Component, OnInit, ViewChild } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { FormControl, FormGroupDirective, Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { ToasterConfig, ToasterService } from 'angular2-toaster';

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
    public formBuilder: FormBuilder,
    private toasterService: ToasterService
  ) { }

  public config1: ToasterConfig = new ToasterConfig({
    limit: 7,
    tapToDismiss: true,
    showCloseButton: true,
    mouseoverTimerStop: true
  });

  ngOnInit() {
  }

  popMeUp(type = 'info', title, body) {
    var toast = {
      type: type,// 'success', 'info', 'warning', 'error'
      title: title,
      timeout: 5000,
      // onShowCallback: (toast) => this.toasterService.pop('success', 'invoked from ' + toast.title + ' onShow callback') ,
      // onHideCallback: (toast) => this.toasterService.pop('info', 'invoked from ' + toast.title + ' onHide callback'),
      body: body
      // bodyOutputType: BodyOutputType.TrustedHtml
    };

    this.toasterService.pop(toast);
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
    let message = `${expense.name} - ${expense.price} zł`
    this.popMeUp('success', 'Added', message)// )
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
