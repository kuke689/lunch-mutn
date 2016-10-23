Please make sure the following is in order before submitting your PR.
PR's not conforming to this checklist will be closed.

- [ ] Place was added in `places.json`, **nowhere else**.
- [ ] The key for your place is **unique** _(e.g "macn")_
- [ ] Place has a **title**
- [ ] Place has a **valid lat, long** in the **form of Array<Number>**
- [ ] [Linting](http://jsonlint.com/) the json file **doesn't output errors**
- [ ] `yarn run test:eslint && yarn test` **pass** on all tests
