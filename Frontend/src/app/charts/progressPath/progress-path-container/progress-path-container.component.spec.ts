import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressPathContainerComponent } from './progress-path-container.component';

describe('ProgressPathContainerComponent', () => {
  let component: ProgressPathContainerComponent;
  let fixture: ComponentFixture<ProgressPathContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressPathContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressPathContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
