import { TestBed, inject } from '@angular/core/testing';

import { HolidayFirestoreService } from './holiday-firestore.service';

xdescribe('HolidayFirestoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HolidayFirestoreService]
    });
  });

  it('should be created', inject([HolidayFirestoreService], (service: HolidayFirestoreService) => {
    expect(service).toBeTruthy();
  }));
});
