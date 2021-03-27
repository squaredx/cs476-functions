# cs476-functions
Firestore Cloud Functions for the CS 476 Major Project

Requires a firestore project for deployment. Please follow this guide [Firebase Getting Started](https://firebase.google.com/docs/functions/get-started)

To run:
1. Have Node JS installed
2. Navigate to project directory and run `npm install` to install required packages
3. `firebase deploy` to deploy to firestore project (blaze plan required) or `firebase emulator:start` to run locally

This project includes two functions:
- updateDashboard
  - fetches and returns a new dashboard object upon request. first checks to see when the last fetch was (rate limit).
- createCompany
  - creates a new company document based upon the type of company specified on user signup
