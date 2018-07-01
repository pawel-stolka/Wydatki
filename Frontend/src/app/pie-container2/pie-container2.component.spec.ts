import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieContainer2Component } from './pie-container2.component';

describe('PieContainer2Component', () => {
  let component: PieContainer2Component;
  let fixture: ComponentFixture<PieContainer2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieContainer2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieContainer2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
