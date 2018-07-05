import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieLabeledComponent } from './pie-labeled.component';

describe('PieLabeledComponent', () => {
  let component: PieLabeledComponent;
  let fixture: ComponentFixture<PieLabeledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieLabeledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieLabeledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
