import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketShowComponent } from './bucket-show.component';

describe('BucketShowComponent', () => {
  let component: BucketShowComponent;
  let fixture: ComponentFixture<BucketShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
