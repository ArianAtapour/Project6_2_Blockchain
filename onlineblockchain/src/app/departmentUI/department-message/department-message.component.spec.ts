import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentMessageComponent } from './department-message.component';

describe('DepartmentMessageComponent', () => {
  let component: DepartmentMessageComponent;
  let fixture: ComponentFixture<DepartmentMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentMessageComponent]
    });
    fixture = TestBed.createComponent(DepartmentMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
