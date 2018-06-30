import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieContainerComponent } from './pie-container.component';

describe('PieContainerComponent', () => {
  let component: PieContainerComponent;
  let fixture: ComponentFixture<PieContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
