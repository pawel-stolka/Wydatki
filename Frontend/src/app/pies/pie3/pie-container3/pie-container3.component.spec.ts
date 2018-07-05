import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieContainer3Component } from './pie-container3.component';

describe('PieContainer3Component', () => {
  let component: PieContainer3Component;
  let fixture: ComponentFixture<PieContainer3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieContainer3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieContainer3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
