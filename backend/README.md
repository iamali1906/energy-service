<br />

<!-- PROJECT INFO -->
<br />
<div align="center">

<h3 align="center"> Tesla energy service </h3>
  <p align="center">
    An awesome project for tesla energy service!
</p>

</div>

## Requirment

<p>
<img alt="npm version" 	src="https://img.shields.io/badge/node-18.16.0-red">
<img alt="nest version" 	src="https://img.shields.io/badge/nest-10.1.0-yellow">
</p>
 
```bash
# Install the NestJS CLI
$ npm i -g @nestjs/cli

```

## Installation

```bash
# use to install the NPM packages from package-lock.json
$ npm ci
# use to install the NPM packages from package.json
$ npm install
```

## Configuration

```bash
# App configuration.
$ create .env file in main folder and addd all the required variable mentioned in '.env.dist' file
```

## Build

```bash
# Create a build.
$ npm run build
```

## Migrations

```bash
# Show migrations.
$ npm run typeorm migration:show

# Create a migration
$ npm run migration:create --name=foo

# Generate a migration from schema changes
$ npm run migration:generate --name=bar

# Run migrations and checks for schema changes
$ npm run migration:run

# Revert migrations
$ npm run migration:revert
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Running with Docker

```bash
# using docker compose file
$ docker compose up
```
