import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockInfoComponent } from './block-info.component';

describe('BlockInfoComponent', () => {
  let component: BlockInfoComponent;
  let fixture: ComponentFixture<BlockInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockInfoComponent]
    });
    fixture = TestBed.createComponent(BlockInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
