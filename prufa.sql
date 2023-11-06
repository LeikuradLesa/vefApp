-- Active: 1699270509178@@127.0.0.1@3306
CREATE DATABASE test;

Use test


CREATE TABLE Persons (
    PersonID int PRIMARY KEY,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
);

INSERT INTO Persons (PersonID, LastName, FirstName, Address, City)
VALUES (25, "jonatanson", "hannes", "Jonatan street", "Jonatan City")

Select * from Persons