## FullStack serverless task manager crud application

This repository consists of frontend and backend. Backend is developed using serverless nodejs framework and deployed on aws.
https://www.serverless.com/
Frontend is developed using react, redux and hooks.

Follow the steps below to setup the serverless backend on aws:

- create a user in your aws account with administrative privileges
- save ACCESS_KEY_ID and SECRET_ACCESS_KEY for programatic access. These keys will be used for configuring aws on your local machine.
- install aws cli on your local machine: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html
- configure aws on your local machine using `aws configure` command
- input ACCESS_KEY_ID and SECRET_ACCESS_KEY appropriately
- cd `task-manager-rest-api`
- install serverless using `npm i serverless -g`
- deploy the rest api using `serverless deploy`

## Features

- serverless framework
- middy middleware
- rest API's

After deploying the rest api it will return the url to use for accessing the rest api from frontend. For example:
https://xxxxxxx.execute-api.us-east-1.amazonaws.com
Use this url in .env file in your frontend application:
API_URL="https://xxxxxxx.execute-api.us-east-1.amazonaws.com"

Follow the steps below to setup the frontend:

- cd task-manager-react-redux-frontend
- execute `npm install`
- execute `npm run dev`
- access the application on `localhost:5173` using browser of your choice
