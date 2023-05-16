import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLeftComponent } from './timeLeft.component';

describe('TimerComponent', () => {
  let component: TimeLeftComponent;
  let fixture: ComponentFixture<TimeLeftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeLeftComponent]
    });
    fixture = TestBed.createComponent(TimeLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
