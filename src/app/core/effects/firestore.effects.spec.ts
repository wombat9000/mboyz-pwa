import {FirestoreEffects} from './firestore.effects';
import {firestoreServiceMocker, getActions, TestActions} from '../../test-support/stubs';
import {FirestoreService} from '../../holiday/services/firestore.service';
import {DbRecord} from '../../holiday/models/DbRecord';
import {TestBed} from '@angular/core/testing';
import {Actions} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {CreateRecord} from '../actions/firestore.actions';
import {cold, hot} from 'jasmine-marbles';


describe('FirestoreEffects', () => {
  let effects: FirestoreEffects;
  let actions$: TestActions;
  let firestoreService: jasmine.SpyObj<FirestoreService>;

  const someRecord: DbRecord = {id: 'someId'};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FirestoreEffects,
        {provide: FirestoreService, useFactory: firestoreServiceMocker},
        {provide: Actions, useFactory: getActions},
      ]
    });

    effects = TestBed.get(FirestoreEffects);
    actions$ = TestBed.get(Actions);
    firestoreService = TestBed.get(FirestoreService);
  });

  describe('create', () => {
    beforeEach(() => {
      const action: Action = new CreateRecord('someOrigin', {
        collection: 'someDocPath',
        record: someRecord
      });
      actions$.stream = hot('-a--', {a: action});
    });

    it('should persist the comment in firstore and report success', () => {
      const createInStore = {
        type: '[someDocPath someOrigin] create',
        payload: {record: someRecord}
      };
      const expected = cold('-a-', {a: createInStore});
      expect(effects.create$).toBeObservable(expected);

      expect(firestoreService.save).toHaveBeenCalledWith('someDocPath', someRecord);
    });
  });
});
