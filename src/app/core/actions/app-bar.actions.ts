import {Action} from '@ngrx/store';

export const SET_TITLE = '[AppBar] set title';


export class SetTitle implements Action {
  type = SET_TITLE;

  constructor(readonly payload: { newTitle: string }) {
  }
}

export type AppBarActions =
  SetTitle



