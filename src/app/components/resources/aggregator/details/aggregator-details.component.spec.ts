import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AggregatorDetailsComponent} from './aggregator-details.component';

describe('AggregatorComponent', () => {
  let component: AggregatorDetailsComponent;
  let fixture: ComponentFixture<AggregatorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggregatorDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggregatorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
