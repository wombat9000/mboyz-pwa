import {DebugElement} from '@angular/core';
import {DocumentChangeAction} from 'angularfire2/firestore';
import {DocumentChange, DocumentChangeType, DocumentData} from '@firebase/firestore-types';

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

export function createChangeAction(changeType: DocumentChangeType, payload): DocumentChangeAction {
  const data: DocumentData = {...payload};
  const snapshot = jasmine.createSpyObj('QueryDocumentSnapshot', ['data']);
  snapshot.data.and.returnValue(data);

  const changePayload: DocumentChange = {
    type: changeType,
    doc: snapshot,
    oldIndex: null,
    newIndex: null
  };
  return {
    type: changeType,
    payload: changePayload
  };
}
