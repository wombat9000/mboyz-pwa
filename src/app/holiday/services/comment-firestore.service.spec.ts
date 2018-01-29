import { TestBed, inject } from '@angular/core/testing';

import { CommentFirestore } from './comment-firestore.service';

xdescribe('CommentFirestore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentFirestore]
    });
  });

  it('should be created', inject([CommentFirestore], (service: CommentFirestore) => {
    expect(service).toBeTruthy();
  }));
});
