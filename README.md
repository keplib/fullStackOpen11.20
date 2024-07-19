# Submission for the final exercise of Fullstack Open part 11

## Purpose
This repo contains the solutions for exercise 11.21 and 11.22 of [Fullstack Open course part 11 - Introduction to CI/CD](https://fullstackopen.com/en/part11/).
Purpose of this exercise was deploying a fullstack app and building a CI/CD pipeline.

[Course Notes part 11 - CD/CD](#course-notes-part-11-fullstack-open) <br>
[Course Review part 11 - CI/CD](#course-review-part-11-fullstack-open) <br>

## Code base structure
The app is a very simplistic phonebook app built from scratch. It's hosted in a monorepo that contains three main components:

- */client:* contains the frontend of the app. It's built in ***React*** using ***Vite***
- */server:* this is the backend of the app, built in ***Express.js***
- */db:* this folder hosts the files to run a dummy database with pre-seeded data for development purposes (using ***MongoDB***)

*Note:* *Docker and containerization was **not** part of this exercise but as a I already finished that part of the course I also included containerization in the app for learning purposes.*

## Running the production app
For security reasons it's not possible to access and run the app with the production database. But you can access it [here](https://cicd-phonebook-client.onrender.com).
It's hosted on **render.com** using **Dockerfiles** both for backend as well as frontend.

*Note: I'm using the free plan of the hosting platform and it might take a minute to spin up the app after inactivity!*

## Running the app in development environment:
You can run the app with one command using **docker-compose**. 

- Clone the repo
- Run the following command from the root of the project:
  ```docker compose -f docker-compose.dev.yaml up ```

This command will spin up a local database from a **mongodb** container, populate it with some dummy data and then run both backend and frontend. You can reach the app on `localhost:8000`.

 ## Running the backend

 If you only need to run the backend without modifying it you can do it by using **Docker**
In the */server* folder run: ```docker compose -f docker-compose.dev.yaml up ```
This will start both the local database and the backend and you can access it on `localhost:3000`.

Otherwise, you can use **npm**:

 - First start the database: go to */db* folder and run `docker compose -f docker-compose.dev.yaml up`
 - Then go to */server* folder and run `npm i && npm run dev`. The server will be accessible on `localhost:3000`.

 ## Running the frontend:

 You can run **npm** to run the frontend app: go to */client* folder and run `npm i && npm run dev`. The app is hosted on `localhost:5173`. 

 ## Pushing code to production
 Merging to the master branch requires both an approval as well as passing all the tests in the **gtihub workflows**.

 
 
