# Knex

Knex is a SQL query builder, mainly used for Node.js applications with built in model schema creation, table migrations, connection pooling and seeding.

## Install Knex and Knex Command Line Tool

Install `knex` __globally__ on your local computer.

```bash
 npm install knex -g
```

This will allow us to use `knex` as a command line tool that helps you create and manage your knex files.

In addition, you will need to also install the `knex` module __locally__ to use in your project.

```bash
 npm install knex --save
```

set up knexfile.js

```bash
knex init
```

## Adding a migration

```bash
knex migrate:make initial
```

## Adding a seed

```bash
knex seed:make 01_seed_name
```

## Run the migration

```bash
knex migrate:latest
```

## Run the seeder

```bash
knex seed:run
```