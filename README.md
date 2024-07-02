# BestBags

## Table of contents

- [Introduction](#introduction)
- [Demo](#screenshots)
- [Run](#run)
- [Technology](#technology)
- [Features](#features)


## Introduction

An appointment scheduling website built using Node.js and Express.js.

## Screenshots

This website facilitates appointment bookings with healthcare specialists and clinics. Users can view specialist details, doctor information, clinic features, and manage their appointments conveniently.

![image](https://github.com/nthanhnguyen/BookingAppointmentClinic/assets/110075152/dd3c1476-33d8-4e79-b3bf-ca00568bd575)

![image](https://github.com/nthanhnguyen/BookingAppointmentClinic/assets/110075152/b05e15e5-5a7e-4b43-9741-0870b25d4a15)



## Run

To run this application locally, follow these steps:

- Clone the repository.
- Install dependencies (backend and frontend): npm install
- Set up your environment variables. Create a .env file and add (base on .env.example).
- Initialize the database schema and seed data: npx sequelize-cli db:migrate
- Start the server (backend and frontend): npm start

## Technology

The application is built with:

- Node.js  
- Express 
- MySQL
- EJS
- Sequelize ORM
- Nodemailer
- React Markdown Editor Lite
- React Number Format
- UUID
- Bootstrap
- Redux

## Features

Guest can do the following:

- View Specialist Detail
- View Information of Doctors
- View Information of Clinics
- Booking an Appointment
- Appointment Confirmation via Email

Doctor can do the following:

- Login for Doctor
- Scheduled Time Management
- Patient Scheduling Management
- Send Information of the Medical Examination Process to the Patient
- Patient History Management

Admin can do the following:

- Login for Admin
- User Management
- Doctor Management
- Clinic Management
- Specialty Management


