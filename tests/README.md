### E2E test

## Allure

```sh
npx playwright test --reporter=line --reporter=allure-playwright
```

## Generate Allure Report

```sh
allure generate my-allure-results -o allure-report --clean
```

## Open Allure Report

```sh
allure open allure-report
```

## Launch tests

```sh
npm run test:e2e
```

## Launch tests debug

```sh
npm run test:e2e --debug
```

## Launch one test

```sh
npm run test:e2e -g 'Test name'
```

## Launch one test debug

```sh
npm run test:e2e -g 'Test name' --debug
```

## Update tests screenshots for CI

```sh
docker run --rm --network host -v $(pwd):/work/ -w /work/ -it mcr.microsoft.com/playwright:v1.44.0-focal /bin/bash
```

```sh
npm i
```

```sh
xvfb-run npm run test:e2e --update-snapshots
```
