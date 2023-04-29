import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeadderComponent } from './animeadder.component';

describe('AnimeadderComponent', () => {
  let component: AnimeadderComponent;
  let fixture: ComponentFixture<AnimeadderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeadderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeadderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
