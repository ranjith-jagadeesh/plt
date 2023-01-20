# PLT Project

The NodeJs server to get Stock and Transaction Information.

## Built With

The project has been built with [NodeJs](https://nodejs.org/en/) javascript runtime environment and [ExpressJs](https://expressjs.com/) NodeJs web application framework. To get a detailed knowledge, visit [NodeJs](https://nodejs.org/en/) and [ExpressJs](https://expressjs.com/) website.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To be able to run the project on your local machine, you will need following development tools on your local machine.
1. NodeJs javascript runtime environment with version 12 and above.
2. [yarn](https://yarnpkg.com/package/yarn) package manager.
3. [Docker](https://www.docker.com/) To run applications in dockerised container

### Setup

Run `node -v` and `yarn -v` to check, whether your local machine has configured properly to run the project.

## Local Deployment

### To Run PLT Sample Project Locally

Clone main and cd into the project root directory
```
git clone git@github.com:ranjith-jagadeesh/plt.git
cd plt
```
Install all packages
```
yarn install
```
To build and run docker image
```
yarn docker-up
```

### To Run Tests
Jest and Supertest framework to test and verify requests
```
yarn test
``` 

## Project Tech Stack

The application is built on following Tech Stack

Web Framework - Express

Test Framework - Jest, Supertest

Logging Requests - Morgan (Logging of all Express requests in a standardised format)




