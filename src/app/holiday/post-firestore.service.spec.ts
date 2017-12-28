import {inject, TestBed} from '@angular/core/testing';
import {PostFirestore} from './post-firestore.service';


xdescribe('PostFirestore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostFirestore]
    });
  });

  it('should be created', inject([PostFirestore], (service: PostFirestore) => {
    expect(service).toBeTruthy();
  }));
});
