import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionRequestValidationComponent } from './provision-request-validation.component';

describe('ValidationComponent', () => {
  let component: ProvisionRequestValidationComponent;
  let fixture: ComponentFixture<ProvisionRequestValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvisionRequestValidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvisionRequestValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
