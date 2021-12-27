FROM node:14-alpine

WORKDIR /app

COPY package.json setup.js yarn.lock tsconfig.json tsconfig.paths.json tsconfig.qa.json svgTransform.js setup.js jest.unit.config.js craco.config.js config-overrides.js .env ./

RUN yarn install --frozen-lockfile

CMD ["yarn", "start"]
