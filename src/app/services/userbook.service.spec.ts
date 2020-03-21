import { TestBed } from '@angular/core/testing';
import { UserBookService } from './userbook.service';

describe('UserbookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserBookService = TestBed.get(UserBookService);
    expect(service).toBeTruthy();
  });
});
