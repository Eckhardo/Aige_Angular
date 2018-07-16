import {inject, TestBed} from '@angular/core/testing';

import {EnumService} from './enum.service';

describe('EnumService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnumService]
    });
  });

  it('should be created', inject([EnumService], (service: EnumService) => {
    expect(service).toBeTruthy();
  }));
});
