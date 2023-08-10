import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditChartComponent } from './credit-chart.component';

describe('CreditChartComponent', () => {
  let component: CreditChartComponent;
  let fixture: ComponentFixture<CreditChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
