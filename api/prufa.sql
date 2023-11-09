-- Active: 1699270509178@@127.0.0.1@3306
CREATE DATABASE test;

Use test


CREATE TABLE Persons (
    PersonID int,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
);

#View table
Select * from Persons

#Delete Table
drop table Persons