import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieLabeledContainerComponent } from './pie-labeled-container.component';

describe('PieLabeledContainerComponent', () => {
  let component: PieLabeledContainerComponent;
  let fixture: ComponentFixture<PieLabeledContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieLabeledContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieLabeledContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
