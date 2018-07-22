import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressComboContainerComponent } from './progress-combo-container.component';

describe('ProgressComboContainerComponent', () => {
  let component: ProgressComboContainerComponent;
  let fixture: ComponentFixture<ProgressComboContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressComboContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressComboContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
