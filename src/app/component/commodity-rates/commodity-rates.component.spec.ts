import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityRatesComponent } from './commodity-rates.component';

describe('CommodityRatesComponent', () => {
  let component: CommodityRatesComponent;
  let fixture: ComponentFixture<CommodityRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommodityRatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommodityRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
