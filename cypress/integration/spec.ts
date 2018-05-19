import * as firebase from 'firebase';
import {MtravelUser} from '../../src/app/auth/services/auth.service';
import {User, UserCredential} from '@firebase/auth-types';

firebase.initializeApp({
  apiKey: 'AIzaSyAAPOOtTDNUlsJ2VsBXcRecEat8RTDX0NU',
  authDomain: 'mboyz-staging.firebaseapp.com',
  databaseURL: 'https://mboyz-staging.firebaseio.com',
  projectId: 'mboyz-staging',
  storageBucket: 'mboyz-staging.appspot.com',
  messagingSenderId: '221289899928'
});

describe('Holiday planner', () => {
  before(() => {
    // TODO: should this be in the test suite?
    cy.exec('firebase -P staging firestore:delete /holidays -r -y');
    cy.exec('firebase -P staging firestore:delete /posts -r -y');
    cy.exec('firebase -P staging firestore:delete /comments -r -y');

    // TODO: extract credentials into env variables
    const firestore = firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    firestore.settings(settings);

    firebase.auth().signInWithEmailAndPassword('test@mboyz.de', 'test123')
      .then((it: UserCredential) => {
        const rawUser: User = it.user!;

        const user: MtravelUser = {
          uid: rawUser.uid,
          email: rawUser.email!,
          photoURL: 'somePhoto',
          displayName: 'Max Muemmelmann'
        };

        firestore.doc(`users/${user.uid}`).set(user);
      });
  });

  it('creates new holiday', () => {
    cy.visit('http://localhost:4200/holiday');

    cy.get('.add-holiday').click();
    cy.get('.page-title').contains('create new');

    cy.get('input').type('Test Holiday');
    cy.get('[name="submit"]').click();
    cy.get('.holiday-name').contains('Test Holiday');
  });
});
