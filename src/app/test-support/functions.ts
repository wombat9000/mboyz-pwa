import {DebugElement} from '@angular/core';
import {DocumentChange, DocumentChangeAction} from 'angularfire2/firestore';
import {DocumentChangeType} from '@firebase/firestore-types';

const ButtonClickEvents = {
  left: {button: 0},
  right: {button: 2}
};

export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler('click', eventObj);
  }
}

export function createChangeAction<T>(changeType: DocumentChangeType, payload: T): DocumentChangeAction<T> {
  const data: T = payload;
  const snapshot = {
    data: jest.fn()
  };
  snapshot.data.mockReturnValue(data);

  const changePayload: DocumentChange<T> = {
    type: changeType,
    doc: snapshot,
    oldIndex: 1,
    newIndex: 1
  };
  return {
    type: changeType,
    payload: changePayload
  };
}
