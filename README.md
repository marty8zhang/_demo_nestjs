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
has been included in `dev/postman/_demo_nestjs.postman_collection.json`.
**Note:** Also, check out [the API Authentication section](#api-authentication)
below first.

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

Most API endpoints are protected by the authentication module/middleware.

1. First, the PostgreSQL database needs to be manually seeded with users (and
   user roles) data in `dev/database-postgres/*.sql`.
2. Then, an access token can be obtained by `POST`ing the `email` and `password`
   pair to http://localhost:3000/authentication/sign-in.
3. Finally, the access token will need to be supplied via the HTTP headers for
   each request to the API endpoints. E.g.,
   ```
   "Authorization": "Bearer the-access-token"
   ```
   **Note:** If using the Postman collection in step 2, this part will be
   automatically done.

# GraphQL

The GraphQL Playground can be accessed via http://localhost:3000/graphql.
An access token needs to be provided through the `HTTP HEADERS` section via the
UI.
