# JamesG Blog

This project shares my step count from the past two days live on the [steps.jamesg.app](https://steps.jamesg.app).

This repository uses the following technologies:

- Grommet. Grommet is a UX framework with dozens of reusable UI components that you can use out-of-the-box.
- NextJS. NextJS is a React framework used to create production-grade, scalable React web applications.
- Now. Vercel Now is a tool used to deploy applications efficiently using a serverless architecture.
- Fitbit API. The Fitbit API is used to retrieve my step count and goals data.

## Getting started

To get started with this project, follow the instructions below.

1. Clone repository

`git clone https://github.com/jamesgallagher432/jamesg-website`

2. Install packages

`npm run setup`

3. Run the development server

`npm run dev`

The application will be served at: http://localhost:3000

## Fitbit API

To use this application, you should set the following environmental variable in the .env file:

`FITBIT_KEY=[Your Fitbit API Key]`

You can learn more about how to authenticate with the Fitbit API [here](https://dev.fitbit.com/build/reference/web-api/oauth2/).

This project is based on the Grommet [create-next-app](https://www.npmjs.com/package/create-next-appp) example.
