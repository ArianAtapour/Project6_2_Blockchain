import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipperMessageComponent } from './shipper-message.component';

describe('ShipperMessageComponent', () => {
  let component: ShipperMessageComponent;
  let fixture: ComponentFixture<ShipperMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShipperMessageComponent]
    });
    fixture = TestBed.createComponent(ShipperMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
