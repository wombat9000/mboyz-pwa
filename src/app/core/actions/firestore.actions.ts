import {Action} from '@ngrx/store';
import {DbRecord} from '../../holiday/models/DbRecord';

export const CREATE_RECORD = '[Firestore] create';

export class CreateRecord implements Action {
  type = CREATE_RECORD;

  constructor(readonly origin: string, readonly payload: { collection: string, record: DbRecord }) {
  }
}

export type FirestoreActions =
  CreateRecord;
