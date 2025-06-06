// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  REST_API_USERS: 'http://127.0.0.1:8000/apiuser/auth/user',
  REST_API_AUTH_LOGIN: 'http://127.0.0.1:8000/apiuser/auth/login',
  REST_API_AUTH_REGISTER: 'http://127.0.0.1:8000/apiuser/auth/register',
  REST_API_AUTH_REFRESH: 'http://127.0.0.1:8000/apiuser/auth/refresh',
  REST_API_EQUIPOS: 'http://127.0.0.1:8000/apiequipos/equipos',
  REST_API_PARTIDOS: 'http://127.0.0.1:8000/apipartidos/partidos',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
