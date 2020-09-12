import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleCommandComponent } from './handle-command.component';

describe('HandleCommandComponent', () => {
  let component: HandleCommandComponent;
  let fixture: ComponentFixture<HandleCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandleCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandleCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
