import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerMessageComponent } from './buyer-message.component';

describe('BuyerMessageComponent', () => {
  let component: BuyerMessageComponent;
  let fixture: ComponentFixture<BuyerMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyerMessageComponent]
    });
    fixture = TestBed.createComponent(BuyerMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
