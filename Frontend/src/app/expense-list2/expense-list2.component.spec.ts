import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseList2Component } from './expense-list2.component';

describe('ExpenseList2Component', () => {
  let component: ExpenseList2Component;
  let fixture: ComponentFixture<ExpenseList2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseList2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
