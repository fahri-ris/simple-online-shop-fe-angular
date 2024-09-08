import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LovCustomerComponent } from './lov-customer.component';

describe('LovCustomerComponent', () => {
  let component: LovCustomerComponent;
  let fixture: ComponentFixture<LovCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LovCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LovCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
