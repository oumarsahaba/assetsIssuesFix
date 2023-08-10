import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionRequestIndexComponent } from './provision-request-index.component';

describe('IndexComponent', () => {
  let component: ProvisionRequestIndexComponent;
  let fixture: ComponentFixture<ProvisionRequestIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvisionRequestIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvisionRequestIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
