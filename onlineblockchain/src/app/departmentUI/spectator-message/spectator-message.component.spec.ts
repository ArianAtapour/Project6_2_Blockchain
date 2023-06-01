import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectatorMessageComponent } from './spectator-message.component';

describe('SpectatorMessageComponent', () => {
  let component: SpectatorMessageComponent;
  let fixture: ComponentFixture<SpectatorMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpectatorMessageComponent]
    });
    fixture = TestBed.createComponent(SpectatorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
