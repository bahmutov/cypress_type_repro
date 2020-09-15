# Cypress type() repro

## Install cypress

`npm install`

Installs Cypress 5.2.0 and [`@testing-library/cypress`](https://testing-library.com/docs/cypress-testing-library/intro).

## Get Metabase up and running

```shell
docker run --rm -p 3000:3000 --name metabase metabase/metabase:v0.36.4
```

## Run Cypress

```shell
$(npm bin)/cypress open
```

## Run the type test

`type_spec.js` has both a failing and successful test case for typing into a field.

The test will provision your Metabase instance the first time you run it.
