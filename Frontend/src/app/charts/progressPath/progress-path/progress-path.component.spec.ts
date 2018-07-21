import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressPathComponent } from './progress-path.component';

describe('ProgressPathComponent', () => {
  let component: ProgressPathComponent;
  let fixture: ComponentFixture<ProgressPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
