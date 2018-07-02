import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartUpdateComponent } from './chart-update.component';

describe('ChartUpdateComponent', () => {
  let component: ChartUpdateComponent;
  let fixture: ComponentFixture<ChartUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
