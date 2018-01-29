import { TestBed, inject } from '@angular/core/testing';

import { HolidayFirestore } from './holiday-firestore.service';

xdescribe('HolidayFirestoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HolidayFirestore]
    });
  });

  it('should be created', inject([HolidayFirestore], (service: HolidayFirestore) => {
    expect(service).toBeTruthy();
  }));
});
