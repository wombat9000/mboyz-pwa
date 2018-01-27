// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  name: 'dev',
  production: false,
  firebase: {
    apiKey: 'AIzaSyAAPOOtTDNUlsJ2VsBXcRecEat8RTDX0NU',
    authDomain: 'mboyz-staging.firebaseapp.com',
    databaseURL: 'https://mboyz-staging.firebaseio.com',
    projectId: 'mboyz-staging',
    storageBucket: 'mboyz-staging.appspot.com',
    messagingSenderId: '221289899928'
  }
};
