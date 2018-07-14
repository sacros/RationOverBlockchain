import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockallocationComponent } from './stockallocation.component';

describe('StockallocationComponent', () => {
  let component: StockallocationComponent;
  let fixture: ComponentFixture<StockallocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockallocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
