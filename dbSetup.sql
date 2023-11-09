-- Active: 1699365169542@@leikuradlesa.cxafacplwecg.eu-north-1.rds.amazonaws.com@3306@LeikuradLesa


-- create Tables in the database leikuradlesa

delimiter $$
-- create table notandi that stores all user info
create table notandi(
    notendanafn varchar(50) not null,
    lykilord varchar(50) not null,
    netfang varchar(50) not null,
    nafn varchar(50) not null,
    simanumer varchar(50) not null,
    dob DATE not null,
    tegundnotanda int not null,
    primary key(notendanafn)
    FOREIGN KEY (tegundnotanda) REFERENCES TegundNotanda(tegundnotanda)
)$$

-- create table TegundNotanda that stores all user types
create table TegundNotanda(
    tegundnotanda int not null,
    tegund varchar(50) not null,
    primary key(tegundnotanda)
)$$

-- create table hopur that has all groups of studnets and their teachers




