// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // HOST:"http://localhost:8080",
  HOST: 'https://agroshopbackend-qa.herokuapp.com',
  TOKEN_NAME : 'access_token',
  TOKEN_AUTH_USERNAME: 'pallevarR',
  TOKEN_AUTH_PASSWORD: 'pallevarx',
  REINTENTOS: 2,
  MICRO_CRUD: 'micro-crud',
  MICRO_CR : 'micro-cr',
  MICRO_AUTH : 'uaa',
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  stripe:{
    testKey: 'pk_test_51HyNurH6AduFV6L4xeChJSJgQ9Yb2CKZmL4Kl92KVT6IpATUTdzwfUeGf9r5U5dhJeI50kPRYpamP1dLdnUNoXNQ00mPvMF2uo'
  },
  firebaseConfig :{
    apiKey: "AIzaSyB9MLcpIS3cImZ3V7GdYJyihwaenbXj0h4",
    authDomain: "stripe-agroshop-a4e6b.firebaseapp.com",
    projectId: "stripe-agroshop-a4e6b",
    storageBucket: "stripe-agroshop-a4e6b.appspot.com",
    messagingSenderId: "335851554041",
    appId: "1:335851554041:web:ca4f5ceeb424a9d3ce4e28",
    measurementId: "G-Y6EKS0HWVK"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
