import {Action} from '@ngrx/store';
import {DbRecord} from '../../holiday/models/DbRecord';

export const PERSIST_RECORD = '[Firestore] create';
export const PERSIST_SUCCESS = '[Firestore] create success';


export class PersistRecord implements Action {
  type = PERSIST_RECORD;

  constructor(readonly payload: { docPath: string, record: DbRecord }) {
  }
}

export class PersistSuccess implements Action {
  type = PERSIST_SUCCESS;

  constructor() {
  }
}

export type FirestoreActions =
  PersistRecord;
