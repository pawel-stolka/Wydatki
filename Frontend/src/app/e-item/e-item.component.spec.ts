import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EItemComponent } from './e-item.component';

describe('EItemComponent', () => {
  let component: EItemComponent;
  let fixture: ComponentFixture<EItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
