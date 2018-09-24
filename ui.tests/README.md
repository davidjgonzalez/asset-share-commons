All commands form the `ui.tests` folder...

## Initial dependency setup..

$ `npm install`

## To start a local selenium server...

$ `npm run selenium-postinstall`
$ `npm run selenium-start`

## Running tests ...

$ `npm run test:localhost:publish`

Note that this directive executes the wdio overrides at `./test/config/wdio.localhost/macos.publish.conf.js`

Please feel free to create (but not check-in) your own test running configurations as needed if the above do not satisfy your needs.

## Reporting

After performing a test run, a report can be generated via...

`$  npm run mochawesome-report`

