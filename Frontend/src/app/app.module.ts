import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { ToasterModule, ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { MatCardModule } from '@angular/material/card'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatButtonModule } from '@angular/material';

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
import { Chart1Component } from './chart1/chart1.component';
import { D3Service } from 'd3-ng2-service';
import { Chart2Component } from './chart2/chart2.component';


const routes = [
  { path: '', component: HomeComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'expense-list', component: ExpenseListComponent },
  { path: 'expense-list2', component: ExpenseList2Component },
  { path: 'e-list', component: EListComponent },
  { path: 's-chart', component: SimpleChartComponent },
  { path: 'container', component: ContainerComponent },
  // testing chart
  { path: 'chart1', component: Chart1Component },
  { path: 'chart2', component: Chart2Component }
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
    ContainerComponent,
    Chart1Component,
    Chart2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatListModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToasterModule,
  ],
  providers: [ExpenseService, DataService, D3Service,
    ToasterService, {
      provide: HTTP_INTERCEPTORS,
      useClass: DataService,// AuthInterceptorService,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
