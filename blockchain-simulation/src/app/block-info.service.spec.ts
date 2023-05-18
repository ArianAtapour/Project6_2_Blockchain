import { TestBed } from '@angular/core/testing';

import { BlockInfoService } from './block-info.service';

describe('BlockInfoService', () => {
  let service: BlockInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
