// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  firebase: {
    projectId: 'olimpo-57156',
    appId: '1:787546444506:web:107ccccdd9efaebfc88be3',
    databaseURL: 'https://olimpo-57156-default-rtdb.firebaseio.com',
    storageBucket: 'olimpo-57156.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyAJR68s4NnkFz-pNCqpWLntHTkRaqv0MJ4',
    authDomain: 'olimpo-57156.firebaseapp.com',
    messagingSenderId: '787546444506',
    measurementId: 'G-B4F3FKDEJ6',
  },
    production: false,
    firebaseConfig :{
    apiKey: "AIzaSyAJR68s4NnkFz-pNCqpWLntHTkRaqv0MJ4",
    authDomain: "olimpo-57156.firebaseapp.com",
    projectId: "olimpo-57156",
    storageBucket: "olimpo-57156.appspot.com",
    messagingSenderId: "787546444506",
    appId: "1:787546444506:web:107ccccdd9efaebfc88be3",
    measurementId: "G-B4F3FKDEJ6"
  },
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
