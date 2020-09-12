import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShippingAddressComponent } from './create-shippingAddress.component';

describe('CreateShippingAddressComponent', () => {
  let component: CreateShippingAddressComponent;
  let fixture: ComponentFixture<CreateShippingAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateShippingAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateShippingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
