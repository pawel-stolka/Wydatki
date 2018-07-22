import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressComboComponent } from './progress-combo.component';

describe('ProgressComboComponent', () => {
  let component: ProgressComboComponent;
  let fixture: ComponentFixture<ProgressComboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressComboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
