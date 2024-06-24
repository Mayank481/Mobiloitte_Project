# Mobiloitte Assignment

## Introduction
<!-- A brief overview of what the project does, its purpose, and its main features. -->
This project is a scalable and secure API built using Node.js and Express.js, designed to handle user data and perform CRUD operations. The API is integrated with MongoDB for data storage, utilizing Docker for containerization and ensuring easy deployment across environments. Ultimately, the goal is to deploy this application on AWS using Docker containers.

## Features
CRUD Operations: Perform Create, Read, Update, and Delete operations on user data.
Scalability: Designed to scale horizontally with Docker containers.
Security: Implements best practices for securing API endpoints and managing user data.
Integration: Seamless integration with MongoDB for efficient data storage.
Deployment: Ready for deployment on AWS infrastructure using Docker.

## Getting Started

### Prerequisites

1. To run the application you need to have Node JS installed.
2. MongoDB Atlas Account
3. Docker Desktop (windows)
4. Aws Account for deploy 
5. GIT Bash

### Installation
1. Cloning the repository from Github.
2. Docker installation

### Quick Start
A simple example to get started with the project.
1. Cloning repository from GITHUB
2. Install all node-modules
```
npm i
```
3. Create a .ENV (Inside ENV)
`````
PORT = 4000
DB_URI = "Provide mongoDB(Atlas) URI"
JWT_SECRET = "Random String(your Email)"
`````
4. npm start

## Usage
You can perform the CRUD Operation and save the data in database and you can also see the docker working and deployment on AWS.

### Code Structure

Using the MVC Structure for the Code practices.

## API Documentation
API Documentation- I am using Swagger for the API documentation. You can simply start the project and 
providing swagger url.

Step to use Api:- In the APi's we are using the Authentication using JWT, So first you can register yourself using /register API and the login using /login API and take the Token from it and pass in an authorization after that you can perform the others api to access the users data.  

# NOTE :- Please do refer to swagger-ui for particular API's Payloads. Otherwise it will through an error.

for run swagger:- http://localhost:4000/api-docs 

API ENDPOINTS
1. POST /api/user/register: Create a new user.
2. POST /api/user/login : Login a user.
2. GET /api/user/users/:id : Retrieve user information.
3. PUT /api/user/updateuser/:id : Update user information.
4. DELETE /api/user/deleteuser/:id : Delete a user.
5. GET /api/user/users: List all users with pagination support.

## AWS Deployment

1. Creating AWS EC2 Instance:
   1. Log in to your AWS Management Console.
   2. Navigate to EC2 and launch a new instance. Choose an appropriate AMI (Amazon Linux, Ubuntu, etc.) based on your preference.
   3. Once your instance is running, SSH into it using the provided public DNS or IP address.
2. Update package lists and install necessary packages
3. Install Node Js and docker  
4. Making directory
5. Inside directory we clone the project.
6. After cloning providing .ENV file.
7. Run Docker command for creating images.
8. Once the Docker container is running, your service should be accessible on your EC2 instance's public IP or DNS name at port 80.