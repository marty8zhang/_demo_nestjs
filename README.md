# Description

This is a [NestJS](https://nestjs.com) demo project.

# Installation

```bash
$ pnpm install
```

# Running the app

```bash
# Depending services (e.g., databases) need to be started via Docker Compose first:
$ docker compose up -d

# development
$ pnpm start

# watch mode
$ pnpm start:dev

# production mode
$ pnpm start:prod
```

# Test

```bash
# unit tests
$ pnpm test

# test coverage
$ pnpm test:cov

# For demonstration purposes, E2E tests need to use `local-testing` as `NODE_ENV`. This also applies to Docker Compose.
$ docker compose --env-file .env.local-testing up -d
$ pnpm test:e2e
```
