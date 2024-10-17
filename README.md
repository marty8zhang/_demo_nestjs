# Description

This is a [NestJS](https://nestjs.com) backend-only demo project.

# Installation

```bash
$ pnpm install
```

# Running the App

```bash
# Depending services (e.g., databases) need to be started via Docker Compose first.
$ docker compose up -d
```

```bash
# Development.
$ pnpm start
```
```bash
# Watch mode - use SWC (Speedy Web Compiler) to improve the performance.
$ pnpm start:dev -- -b swc
```

```bash
# Production mode.
$ pnpm build && pnpm start:prod
```

Once started, the API endpoints can be tested with Postman. A Postman collection
has been included in `dev/postman/_demo_nestjs.postman_collection.json`. In
order to log in and obtain an access token before accessing most API endpoints,
the PostgreSQL database needs to be seeded with user data in
`dev/database-postgres/*.sql`.

# Running Tests

```bash
# Unit tests.
$ pnpm test
```

```bash
# Test coverage.
$ pnpm test:cov
```

## E2E Tests

To demonstrate how to use different `.env.*` files for different environments,
e.g., to help with isolating testing data in different databases, the `NODE_ENV`
environment variable has been purposely set to `local-testing` for E2E tests.
This requires Docker Compose to also load `.env.local-testing` when spinning up
the databases.

```bash
$ docker compose --env-file .env.local-testing up -d
```

```bash
$ pnpm test:e2e
```

# API Authentication

API authentication is implemented around `AuthenticationModule`. Check out [the
Draw.io diagram](docs/authentication.drawio) to see how it works.
