import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockchainGameComponent } from './blockchain-game.component';

describe('BlockchainGameComponent', () => {
  let component: BlockchainGameComponent;
  let fixture: ComponentFixture<BlockchainGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockchainGameComponent]
    });
    fixture = TestBed.createComponent(BlockchainGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
