// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  apiKey: '636d81e5364ebc98a99d202c57268f18', // YOUR_API_KEY
  endPoint: 'http://ws.audioscrobbler.com/2.0/',
  format:  'json'
};
