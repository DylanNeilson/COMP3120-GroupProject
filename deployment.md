# Links to deployed application:

## Main Site: https://group-ajld-comp3120-assignment2-site.onrender.com/

## Backend Webservice: https://group-ajld-comp3120-assignment2.onrender.com/

# Deployment Instructions:

## This site employs a user-facing frontend web application and a backend json server which makes calls to the API

## To deploy the site, both the web app and the json server need to be active

## The site is deployed via render.io

### To deploy the main web app, load it as a static site, then run the build command on the primary repository

### To deploy the backend server, load it as a webservice, then use "npm install json-server && npm build" as the build command, followed by "npm run server" as the start command

# Continuous Integration:

## At the moment, the only third party service currently utilised is the Internet Games Database (IGDB) API

## This requires minimal maintenance, however a new Secret Key will need to be created every three months in order to enable valid token generation

## To create a new Secret Key, log into the developer Twitch account and generate the key

## Once a new key is generated, replace the old Secret Key constant in /src/server/fetch.js with the new one and redeploy

## The backend will use the new key to generate auth tokens for making API requests from there
