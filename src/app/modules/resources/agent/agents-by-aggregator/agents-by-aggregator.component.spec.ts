import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsByAggregatorComponent } from './agents-by-aggregator.component';

describe('AgentsByAggregatorComponent', () => {
  let component: AgentsByAggregatorComponent;
  let fixture: ComponentFixture<AgentsByAggregatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentsByAggregatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentsByAggregatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
