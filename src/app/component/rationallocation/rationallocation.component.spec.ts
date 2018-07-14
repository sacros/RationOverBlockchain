import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RationallocationComponent } from './rationallocation.component';

describe('RationallocationComponent', () => {
  let component: RationallocationComponent;
  let fixture: ComponentFixture<RationallocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RationallocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RationallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
