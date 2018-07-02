import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EList2Component } from './e-list2.component';

describe('EList2Component', () => {
  let component: EList2Component;
  let fixture: ComponentFixture<EList2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EList2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
