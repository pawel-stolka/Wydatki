import { Component } from '@angular/core';
import { ToasterConfig, ToasterService, BodyOutputType } from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Nasze Finanse';
  comboData

  public configRight: ToasterConfig = new ToasterConfig({
    limit: 7,
    tapToDismiss: true,
    showCloseButton: true,
    positionClass: 'toast-top-right',
    mouseoverTimerStop: true,
    
  });

  constructor(
    private toasterService: ToasterService) {}
  
  ngOnInit() {
    console.log('this.makeData()')
    this.makeData() 
  }

  makeData() {
    let groups = [
      { type: 'op1', sum: 32},
      { type: 'op2', sum: 37},
      { type: 'op3', sum: 17}
    ]
    let groups2 = [
      { type: 'op1', sum: 42},
      { type: 'op2', sum: 27},
      { type: 'op3', sum: 7}
    ]
    let dates = [
      { date: '2018-07-18', name: 'halls', price: 3.5, type: 'pierdoły'},
      { date: '2018-07-19', name: 'masło', price: 35, type: 'zakupy'},
      { date: '2018-07-20', name: 'halls', price: 3.5, type: 'pierdoły'}
    ]
    let dates2 = [
      { date: '2018-07-21', name: 'halls', price: 51.25, type: 'pierdoły'},
      { date: '2018-07-22', name: 'masło', price: 17.5, type: 'zakupy'},
      { date: '2018-07-23', name: 'halls', price: 25, type: 'pierdoły'}
    ]

    this.comboData = [
      { data: dates, groups: groups, week: 0 },
      { data: dates2, groups: groups2, week: 1 }
    ]
  }
    // popMeUp(type = 'error') {
    //   var toast = {
    //     type: type,// 'success', 'info', 'warning', 'error'
    //     title: 'My Toast Demo',
    //     timeout: 3000,
    //     positionClass: 'toast-top-left',
    //     // onShowCallback: (toast) => this.toasterService.pop('success', 'invoked from ' + toast.title + ' onShow callback') ,
    //     // onHideCallback: (toast) => this.toasterService.pop('info', 'invoked from ' + toast.title + ' onHide callback'),
    //     body: '<h5}>this is an angular2 toast</h5>',
    //     bodyOutputType: BodyOutputType.TrustedHtml
    //   };
  
    //   this.toasterService.pop(toast);
    // }
}
