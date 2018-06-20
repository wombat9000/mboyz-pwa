import {inject, TestBed} from '@angular/core/testing';
import {UserService} from './user.service';
import {AngularFirestore} from 'angularfire2/firestore';


xdescribe('UserFirestore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService,
        {provide: AngularFirestore, useFactory}
      ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
