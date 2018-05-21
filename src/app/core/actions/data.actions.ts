import {Action} from '@ngrx/store';
import {DbRecord} from '../../holiday/models/DbRecord';

export interface CreateAction extends Action {
  readonly type: string;
  readonly payload: { readonly record: DbRecord };
}

export type DataActions =
  CreateAction;
