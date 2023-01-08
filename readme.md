# Overview

This is the standalone backend **Query Service** of the Afourathon - **Skills Database Project**. It uses nodejs, prisma ORM & jest testing framework under the hood.Using this service users will be able to make queries with the help of different filters.

# How to start

1. Please make sure to have nodejs installed.
2. Run commands `npm i` in terminal. As result, you'll get all modules
3. To run the test cases run the command `npm run test` in terminal.
4. To start the server in developer mode run the command `npm run dev` in terminal.
5. To start the server in production mode run the command `npm start` in terminal.
6. To build the production ready packages run the command `npm build` in terminal.

# Security

The client must send the user `apiToken` in the Authorization header when making requests to protected resources.  
To retrieve the apiToken, make a post request on `/api/users/signin` with a user email and password.
