# Read me

## run in docker DEV

```
docker-compose up --build
```

open localhost:3001

## run in docker PROD

```
docker build -f Dockerfile.prod -t sample:prod .
```

```
docker-compose -f docker-compose.prod.yml up -d --build
```

open localhost:1337

## APP

start locally
```
yarn start
```
build static
```
yarn build
```

## QA

clean jest cache
```
yarn test:unit:clean
```
run tests
```
yarn test:unit
```
generate coverage report (Istanbul.js)
```
yarn test:unit:coverage
```

## STORYBOOK

run storybook locally
```
yarn storybook
```
build storybook
```
yarn build-storybook
```
