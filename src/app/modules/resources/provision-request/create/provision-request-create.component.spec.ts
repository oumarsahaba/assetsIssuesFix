import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionRequestCreateComponent } from './provision-request-create.component';

describe('CreateComponent', () => {
  let component: ProvisionRequestCreateComponent;
  let fixture: ComponentFixture<ProvisionRequestCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvisionRequestCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvisionRequestCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
