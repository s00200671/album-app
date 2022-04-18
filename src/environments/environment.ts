// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BASE_API: "https://us-central1-song-app-rc.cloudfunctions.net/widgets",
  firebaseConfig : {
    apiKey: "AIzaSyDkjMEe22sK4fjJywAnJtUkupDOAdhrya0",
    authDomain: "song-app-rc.firebaseapp.com",
    projectId: "song-app-rc",
    storageBucket: "song-app-rc.appspot.com",
    messagingSenderId: "906328163302",
    appId: "1:906328163302:web:d7f0aef9819a2874878c27",
    measurementId: "G-LEKY7HF44P"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
