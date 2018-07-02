import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EItem2Component } from './e-item2.component';

describe('EItem2Component', () => {
  let component: EItem2Component;
  let fixture: ComponentFixture<EItem2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EItem2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EItem2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
