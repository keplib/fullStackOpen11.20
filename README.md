# Submission for the final exercise of Fullstack Open part 11

## Purpose

This repo contains the solutions for exercise 11.21 and 11.22 of [Fullstack Open course part 11 - Introduction to CI/CD](https://fullstackopen.com/en/part11/).
Purpose of this exercise was deploying a fullstack app and building a CI/CD pipeline.

## Code base structure

The app is a very simplistic phonebook app built from scratch. It's hosted in a monorepo that contains three main components:

- _/client:_ contains the frontend of the app. It's built in **_React_** using **_Vite_**
- _/server:_ this is the backend of the app, built in **_Express.js_**
- _/db:_ this folder hosts the files to run a dummy database with pre-seeded data for development purposes (using **_MongoDB_**)

_Note:_ _Docker and containerization was **not** part of this exercise but as a I already finished that part of the course I also included containerization in the app for learning purposes._

## Running the production app

For security reasons it's not possible to access and run the app with the production database. But you can access it [here](https://cicd-phonebook-client.onrender.com).
It's hosted on **render.com** using **Dockerfiles** both for backend as well as frontend.

_Note: I'm using the free plan of the hosting platform and it might take a minute to spin up the app after inactivity!_

## Running the app in development environment:

You can run the app with one command using **npm**.

- Clone the repo
- Run the following command from the root of the project:
  `npm run start:all:dev`

This command will spin up a local database from a **mongodb** container, populate it with some dummy data and then run both backend and frontend. You can reach the app on `localhost:5173`.

## Running the backend

If you only need to run the backend without modifying it you can do it by using **npm**
In the root folder run: `npm run start:dev-server`
This will start both the local database and the backend and you can access it on `localhost:3000`.

## Running the frontend

You can run **npm** to run the frontend app: in the root folder you need to run `npm run start:frontend`. The app is hosted on `localhost:5173`.

## Pushing code to production

Merging to the master branch requires both an approval as well as passing all the tests in the **gtihub workflows** that includes unit tests for the backend and frontend, plus linting and build for frontend.

## Frontend testing

For unit tests **vitest** is being used. You can run it using `npm run test` in the _/client_ folder.

## Backend testing

For unit tests **supertest** is being used. There is an empty **mongodb** container dedicated for testing purposes.
Start it first with `docker compose -f docker-compose.test.yaml up` from _/db_ folder (or: `npm run start:test-db` in the root).
Then you can run the tests using `npm run test` in the _/server_ folder.

## End2End testing

Playwright is being used for executing the end to end tests. You can run them witn `npm run test:e2e` in the root.
