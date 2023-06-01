import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesPageComponent } from './rules-page.component';

describe('RulesPageComponent', () => {
  let component: RulesPageComponent;
  let fixture: ComponentFixture<RulesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RulesPageComponent]
    });
    fixture = TestBed.createComponent(RulesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
