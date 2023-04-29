import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranceInfoComponent } from './france-info.component';

describe('FranceInfoComponent', () => {
  let component: FranceInfoComponent;
  let fixture: ComponentFixture<FranceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FranceInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FranceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
