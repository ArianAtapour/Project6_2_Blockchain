import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductChecklistComponent } from './product-checklist.component';

describe('ProductChecklistComponent', () => {
  let component: ProductChecklistComponent;
  let fixture: ComponentFixture<ProductChecklistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductChecklistComponent]
    });
    fixture = TestBed.createComponent(ProductChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
