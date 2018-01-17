import { TestBed, inject } from '@angular/core/testing';
import {UserFirestore} from './user-firestore.service';


xdescribe('UserFirestore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserFirestore]
    });
  });

  it('should be created', inject([UserFirestore], (service: UserFirestore) => {
    expect(service).toBeTruthy();
  }));
});
