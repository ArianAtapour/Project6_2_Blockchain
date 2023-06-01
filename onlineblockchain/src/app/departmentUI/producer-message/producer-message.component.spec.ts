import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerMessageComponent } from './producer-message.component';

describe('ProducerMessageComponent', () => {
  let component: ProducerMessageComponent;
  let fixture: ComponentFixture<ProducerMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProducerMessageComponent]
    });
    fixture = TestBed.createComponent(ProducerMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
