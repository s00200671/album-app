import { TestBed } from '@angular/core/testing';

import { AlbumAPIService } from './album-api.service';

describe('AlbumAPIService', () => {
  let service: AlbumAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
