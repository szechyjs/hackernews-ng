import { TestBed } from '@angular/core/testing';

import { HackerNewsService } from './hacker-news.service';

describe('HackerNewsService', () => {
  let service: HackerNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HackerNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
