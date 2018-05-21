import { BrowserModule } from '@angular/platform-browser';
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

const routes = [
  { path: '', component: HomeComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'expense-list', component: ExpenseListComponent },
  { path: 'expense-list2', component: ExpenseList2Component }
]


@NgModule({
  declarations: [
    AppComponent,
    ExpenseListComponent,
    HomeComponent,
    ExpensesComponent,
    ExpenseGroupComponent,
    ExpenseList2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpModule
  ],
  providers: [ExpenseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
