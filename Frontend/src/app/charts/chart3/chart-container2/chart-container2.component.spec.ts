import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartContainer2Component } from './chart-container2.component';

describe('ChartContainer2Component', () => {
  let component: ChartContainer2Component;
  let fixture: ComponentFixture<ChartContainer2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartContainer2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartContainer2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
