import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancierMessageComponent } from './financier-message.component';

describe('FinancierMessageComponent', () => {
  let component: FinancierMessageComponent;
  let fixture: ComponentFixture<FinancierMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancierMessageComponent]
    });
    fixture = TestBed.createComponent(FinancierMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
