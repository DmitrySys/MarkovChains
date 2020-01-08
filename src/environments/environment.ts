// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mapConfig: {
    coords: [55.00910478591716, 82.93678258251948],
    zoom:14,
    url:'https://api-maps.yandex.ru/2.1/?apikey=93b15e8c-75b3-4e6c-b545-af9d7ce983cb&lang=ru_RU'
  },
  graphSize:{
    w:150,
    h:150
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
