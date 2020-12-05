// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  //HOST:"http://localhost:8080",
  HOST: "https://agroshopbackend-qa.herokuapp.com",
  TOKEN_NAME : 'access_token',
  TOKEN_AUTH_USERNAME: 'pallevarR',
  TOKEN_AUTH_PASSWORD: 'pallevarx',
  REINTENTOS: 2,
  MICRO_CRUD: 'micro-crud',
  MICRO_CR : 'micro-cr',
  MICRO_AUTH : 'uaa',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
