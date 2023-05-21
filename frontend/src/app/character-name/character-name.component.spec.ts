import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterNameComponent } from './character-name.component';

describe('CharacterNameComponent', () => {
  let component: CharacterNameComponent;
  let fixture: ComponentFixture<CharacterNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterNameComponent]
    });
    fixture = TestBed.createComponent(CharacterNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
