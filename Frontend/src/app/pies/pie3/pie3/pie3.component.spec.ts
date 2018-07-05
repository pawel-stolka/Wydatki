import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pie3Component } from './pie3.component';

describe('Pie3Component', () => {
  let component: Pie3Component;
  let fixture: ComponentFixture<Pie3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pie3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pie3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
