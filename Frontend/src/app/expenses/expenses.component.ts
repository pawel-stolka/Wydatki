import { Component, OnInit, ViewChild } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { FormControl, FormGroupDirective, Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { ErrorStateMatcher } from '@angular/material';
import { Bill } from '../models/Bill';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  @ViewChild(FormGroupDirective) myForm;
  error
  selection: any[] = []
  types: any[] = []
  names: any[] = []

  nameFormControl = new FormControl('', [ Validators.required ])
  typeFormControl = new FormControl('', [ Validators.required ])
  dateFormControl = new FormControl('', [ Validators.required ])
  priceFormControl = new FormControl('', [ Validators.required ])
  extraFormControl = new FormControl('', [ ])

  complexGroup: FormGroup = new FormGroup({
    'nameFormControl': this.nameFormControl,
    'typeFormControl': this.typeFormControl,
    'dateFormControl': this.dateFormControl,
    'priceFormControl': this.priceFormControl,
    'extraFormControl': this.extraFormControl
  })

  matcher = new MyErrorStateMatcher();
  
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
    // this.selection.push("option 1")
    // this.selection.push("option 2")
    // let types = 
    // this.getNames()
    this.getTypes()
    // console.log(this.types)
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
    let ex = {
      name: this.complexGroup.value.nameFormControl,
      type: this.complexGroup.value.typeFormControl,
      date: this.complexGroup.value.dateFormControl,
      price: this.complexGroup.value.priceFormControl,
      extra: this.complexGroup.value.extraFormControl
    }

    try {
      let bill = new Bill(ex.name, ex.type, ex.price, ex.date, ex.extra)
      this.expenseService.addBill(bill)
        .subscribe(
          res => {
            this.error = null
            console.log(bill)
            let message = `${bill.name} [${bill.type}] - ${bill.price} zł`
            this.popMeUp('success', 'Added', message)// )
          },
          err => {
            this.error = err
            console.log(err)
          }
      )
      
    } catch (error) {
      this.error = error
      console.error('something with Bill', error)
    }

    if (this.myForm) {
      this.myForm.resetForm();
    }
  }

  getTypes() {
    return this.expenseService.getTypes()
    .subscribe(
      data => {
        let types = data.json()
        
        types.sort(this.byCount)

        console.log(types)
        types.forEach(element => {
          this.selection.push(element)
        });
      }
    )
  }

  getNames() {
    return this.expenseService.getNames()
    .subscribe(
      data => {
        console.log(data.json())
        
      }
    )
  }

  byCount(a,b) {
    const countA = a.count,
          countB = b.count
    return (countA > countB) ? -1 : 1
  }
}
