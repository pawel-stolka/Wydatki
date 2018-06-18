import { Component } from '@angular/core';
import { ToasterConfig, ToasterService, BodyOutputType } from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Nasze Finanse';

  public configRight: ToasterConfig = new ToasterConfig({
    limit: 7,
    tapToDismiss: true,
    showCloseButton: true,
    positionClass: 'toast-top-right',
    mouseoverTimerStop: true,
    
  });

  constructor(
    private toasterService: ToasterService) {}

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
