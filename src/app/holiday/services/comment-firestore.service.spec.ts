import { TestBed, inject } from '@angular/core/testing';

import { FirestoreService } from './comment-firestore.service';

xdescribe('FirestoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirestoreService]
    });
  });

  it('should be created', inject([FirestoreService], (service: FirestoreService) => {
    expect(service).toBeTruthy();
  }));
});
