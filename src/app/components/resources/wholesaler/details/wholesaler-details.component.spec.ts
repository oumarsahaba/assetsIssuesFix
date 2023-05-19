import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WholesalerDetailsComponent } from './wholesaler-details.component';

describe('WholesalerComponent', () => {
  let component: WholesalerDetailsComponent;
  let fixture: ComponentFixture<WholesalerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WholesalerDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WholesalerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
