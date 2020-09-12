import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBillingAddressComponent } from './create-billingAddress.component';

describe('CreateBillingAddressComponent', () => {
  let component: CreateBillingAddressComponent;
  let fixture: ComponentFixture<CreateBillingAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBillingAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBillingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
