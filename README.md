# Docker

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

