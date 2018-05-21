import {firestoreServiceMocker, getActions, TestActions} from '../../test-support/stubs';
import {FirestoreService} from '../../holiday/services/firestore.service';
import {DbRecord} from '../../holiday/models/DbRecord';
import {TestBed} from '@angular/core/testing';
import {Actions} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {cold, hot} from 'jasmine-marbles';
import {DataEffects} from './data.effects';
import {CreateAction} from '../actions/data.actions';
import {Injectable, Type} from '@angular/core';


class TestCreate implements CreateAction {
  readonly type = '[Test] create';

  constructor(readonly payload: { readonly record: DbRecord }) {
  }
}

class TestCreateSuccess implements Action {
  type = '[Test] create success';

  constructor() {
  }
}

@Injectable()
class TestEffects extends DataEffects {
  readonly createActionType = '[Test] create';
  readonly createSuccessAction: Type<Action> = TestCreateSuccess;

  constructor(actions$: Actions, firestoreService: FirestoreService) {
    super(actions$, firestoreService);
  }
}


describe('DataEffects', () => {
  let effects: DataEffects;
  let actions$: TestActions;
  let firestoreService: jasmine.SpyObj<FirestoreService>;

  const someRecord: DbRecord = {id: 'someId'};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TestEffects,
        {provide: FirestoreService, useFactory: firestoreServiceMocker},
        {provide: Actions, useFactory: getActions},
      ]
    });

    actions$ = TestBed.get(Actions);
    firestoreService = TestBed.get(FirestoreService);
    effects = TestBed.get(TestEffects);
  });

  describe('create', () => {
    beforeEach(() => {
      const action: Action = new TestCreate({record: someRecord});
      firestoreService.save.and.returnValue(Promise.resolve());

      actions$.stream = hot('-a--', {a: action});
    });

    it('should persist the record in firstore and report success', () => {
      const createSuccess = new TestCreateSuccess();

      const expected = cold('-a-', {a: createSuccess});

      expect(effects.create$).toBeObservable(expected);

      expect(firestoreService.save).toHaveBeenCalledWith('comments', someRecord);
    });
  });
});
