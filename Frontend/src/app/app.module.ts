import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { ToasterModule, ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'


import { AppComponent } from './app.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { HomeComponent } from './home/home.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ExpenseService } from './expense.service';
import { HttpModule } from '@angular/http';
import { ExpenseGroupComponent } from './expense-group/expense-group.component';
import { ExpenseList2Component } from './expense-list2/expense-list2.component';
import { EListComponent } from './e-list/e-list.component';
import { EItemComponent } from './e-item/e-item.component';
import { DataService } from './data.service';
import { SimpleChartComponent } from './simple-chart/simple-chart.component';
import { ContainerComponent } from './container/container.component';

const routes = [
  { path: '', component: HomeComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'expense-list', component: ExpenseListComponent },
  { path: 'expense-list2', component: ExpenseList2Component },
  { path: 'e-list', component: EListComponent },
  { path: 's-chart', component: SimpleChartComponent },
  { path: 'container', component: ContainerComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    ExpenseListComponent,
    HomeComponent,
    ExpensesComponent,
    ExpenseGroupComponent,
    ExpenseList2Component,
    EListComponent,
    EItemComponent,
    SimpleChartComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToasterModule,
  ],
  providers: [ExpenseService, DataService,
    ToasterService, {
      provide: HTTP_INTERCEPTORS,
      useClass: DataService,// AuthInterceptorService,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
