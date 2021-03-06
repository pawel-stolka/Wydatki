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
import { MatRadioModule } from '@angular/material/radio';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ExpenseService } from './expense.service';
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { SimpleChartComponent } from './charts/simple/simple-chart/simple-chart.component';
import { ContainerComponent } from './charts/simple/container/container.component';
import { Chart1Component } from './charts/chart1/chart1/chart1.component';
import { D3Service } from 'd3-ng2-service';
import { Chart2Component } from './charts/chart2/chart2/chart2.component';
import { ChartUpdateComponent } from './charts/chart2/chart-update/chart-update.component';
import { ChartContainerComponent } from './charts/chart1/chart-container/chart-container.component';
import { ChartContainer2Component } from './charts/chart3/chart-container2/chart-container2.component';
import { Chart3Component } from './charts/chart3/chart3/chart3.component';
import { PieComponent } from './pies/pie1/pie/pie.component';
import { PieContainerComponent } from './pies/pie1/pie-container/pie-container.component';
import { PieContainer2Component } from './pies/pie2/pie-container2/pie-container2.component';
import { Pie2Component } from './pies/pie2/pie2/pie2.component';
import { EList2Component } from './E/e-list2/e-list2.component';
import { EItem2Component } from './E/e-item2/e-item2.component';
import { PieContainer3Component } from './pies/pie3/pie-container3/pie-container3.component';
import { Pie3Component } from './pies/pie3/pie3/pie3.component';
import { PieLabeledContainerComponent } from './pies/pie3/pie-labeled-container/pie-labeled-container.component';
import { PieLabeledComponent } from './pies/pie3/pie-labeled/pie-labeled.component';
import { ProgressChartComponent } from './charts/progress/progress-chart/progress-chart.component';
import { ProgressContainerComponent } from './charts/progress/progress-container/progress-container.component';
import { PathContainerComponent } from './charts/path/path-container/path-container.component';
import { PathComponent } from './charts/path/path/path.component';
import { Path2Component } from './charts/path/path2/path2.component';
import { ProgressPathContainerComponent } from './charts/progressPath/progress-path-container/progress-path-container.component';
import { ProgressPathComponent } from './charts/progressPath/progress-path/progress-path.component';
import { ProgressComboComponent } from './charts/progress-combo/progress-combo/progress-combo.component';
import { ProgressComboContainerComponent } from './charts/progress-combo-container/progress-combo-container.component';


const routes = [
  { path: '', component: HomeComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: 's-chart', component: SimpleChartComponent },
  { path: 'container', component: ContainerComponent },
  // testing chart
  { path: 'chart1', component: Chart1Component },
  { path: 'chart2', component: Chart2Component },
  { path: 'chart-update', component: ChartContainerComponent },
  { path: 'chart-update2', component: ChartContainer2Component },
  { path: 'pie', component: PieContainerComponent },
  { path: 'e-list2', component: EList2Component },
  { path: 'e-item2', component: EItem2Component },
  { path: 'pie-labeled', component: PieLabeledContainerComponent },
  { path: 'progress', component: ProgressContainerComponent },
  { path: 'path', component: PathContainerComponent },
  { path: 'progress-path', component: ProgressPathContainerComponent },
  { path: 'progress-combo', component: ProgressComboContainerComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExpensesComponent,
    SimpleChartComponent,
    ContainerComponent,
    Chart1Component,
    Chart2Component,
    ChartUpdateComponent,
    ChartContainerComponent,
    ChartContainer2Component,
    Chart3Component,
    PieComponent,
    PieContainerComponent,
    PieContainer2Component,
    Pie2Component,
    EList2Component,
    EItem2Component,
    PieContainer3Component,
    Pie3Component,
    PieLabeledContainerComponent,
    PieLabeledComponent,
    ProgressChartComponent,
    ProgressContainerComponent,
    PathContainerComponent,
    PathComponent,
    Path2Component,
    ProgressPathContainerComponent,
    ProgressPathComponent,
    ProgressComboComponent,
    ProgressComboContainerComponent
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
    MatRadioModule,
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
