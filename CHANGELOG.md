# 2.0.0

## New features
* Added CHANGELOG
* Added commitizen
* Slack API test & token presence test in .env/ENV with Mocha
* Integration with Hound CI

## Bugfixes
* Eslint now uses the node & mocha env & node plugin
* Travis CI now uses package.json's engine fields and doesn't check for npm v3+ anymore
* Travis CI runs `npm test` and the eslint task instead of serve (which never worked, duh)
* Removed extraneous arguments in some function arities

## Styling
* Removed `js/**/*.*` from eslint ignores
* Repo & desc field in package.json
* npm run tasks use the node_modules folder instead of global installs (except for eslint)
* `console.warn` instead of `console.log`
