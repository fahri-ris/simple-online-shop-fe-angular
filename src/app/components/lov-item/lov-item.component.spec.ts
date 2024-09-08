import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LovItemComponent } from './lov-item.component';

describe('LovItemComponent', () => {
  let component: LovItemComponent;
  let fixture: ComponentFixture<LovItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LovItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LovItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
