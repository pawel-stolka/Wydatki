import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

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

const routes = [
  { path: '', component: HomeComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'expense-list', component: ExpenseListComponent },
  { path: 'expense-list2', component: ExpenseList2Component },
  { path: 'e-list', component: EListComponent }
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
    EItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpModule,
    BrowserAnimationsModule,
  ],
  providers: [ExpenseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
