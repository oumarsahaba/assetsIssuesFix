import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAgentByAggregatorComponent } from './show-agent-by-aggregator.component';

describe('ShowAgentByAggregatorComponent', () => {
  let component: ShowAgentByAggregatorComponent;
  let fixture: ComponentFixture<ShowAgentByAggregatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAgentByAggregatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAgentByAggregatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
