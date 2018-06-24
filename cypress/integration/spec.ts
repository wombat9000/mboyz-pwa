import * as firebase from 'firebase';
import {MtravelUser} from '../../src/app/auth/services/auth.service';
import {User, UserCredential} from '@firebase/auth-types';
import uuid = require('uuid');

firebase.initializeApp({
  apiKey: 'AIzaSyAAPOOtTDNUlsJ2VsBXcRecEat8RTDX0NU',
  authDomain: 'mboyz-staging.firebaseapp.com',
  databaseURL: 'https://mboyz-staging.firebaseio.com',
  projectId: 'mboyz-staging',
  storageBucket: 'mboyz-staging.appspot.com',
  messagingSenderId: '221289899928'
});

describe('Holiday planner', () => {
  const testId = uuid();

  before(() => {
    const firestore = firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    firestore.settings(settings);

    firebase.auth().signInWithEmailAndPassword('test@mboyz.de', 'test123')
      .then((it: UserCredential) => {
        const rawUser: User = it.user!;

        const user: MtravelUser = {
          id: rawUser.uid,
          email: rawUser.email!,
          photoURL: 'somePhoto',
          displayName: 'Max Muemmelmann'
        };

        firestore.doc(`users/${user.id}`).set(user);
      });
  });

  it('creates new holiday', () => {
    cy.visit('http://localhost:4200/holiday');

    cy.get('.add-holiday').click();
    cy.get('.page-title').contains('create new');
    cy.get('input').type(`Holiday ${testId}`);
    cy.get('[name="submit"]').click();

    cy.contains(`Holiday ${testId}`).click();
    cy.get('.page-title').contains(`Holiday`);
  });
});
