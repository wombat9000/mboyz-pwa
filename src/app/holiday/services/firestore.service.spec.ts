import { TestBed, inject } from '@angular/core/testing';
import {FirestoreService} from './firestore.service';


xdescribe('FirestoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirestoreService]
    });
  });

  xit('should be created', inject([FirestoreService], (service: FirestoreService) => {
    expect(service).toBeTruthy();
  }));
});
