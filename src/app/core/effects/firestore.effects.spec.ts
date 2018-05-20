import {FirestoreEffects} from './firestore.effects';
import {firestoreServiceMocker, getActions, TestActions} from '../../test-support/stubs';
import {FirestoreService} from '../../holiday/services/firestore.service';
import {DbRecord} from '../../holiday/models/DbRecord';
import {TestBed} from '@angular/core/testing';
import {Actions} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {PersistRecord, PersistSuccess} from '../actions/firestore.actions';
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
      const action: Action = new PersistRecord({
        docPath: 'someDocPath',
        record: someRecord
      });
      actions$.stream = hot('-a--', {a: action});
    });

    it('should persist the comment in firstore and report success', () => {
      const createSuccess: Action = new PersistSuccess();
      const expected = cold('-a-', {a: createSuccess});
      expect(effects.create$).toBeObservable(expected);

      expect(firestoreService.save).toHaveBeenCalledWith('someDocPath', someRecord);
    });

    it('should report failure on error', () => {
      const error = cold('-#-');
      firestoreService.save.and.returnValue(error);

      const createFail: Action = new PersistSuccess();
      const expected = cold('-a-', {a: createFail});
      expect(effects.create$).toBeObservable(expected);

      expect(firestoreService.save).toHaveBeenCalledWith('someDocPath', someRecord);
    });
  });
});
