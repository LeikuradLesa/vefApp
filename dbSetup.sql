-- Active: 1700573522610@@leikuradlesa.cxafacplwecg.eu-north-1.rds.amazonaws.com@3306@LeikuradLesa

-- create Tables in the database leikuradlesa
-- create table notandi that stores all user info
create table notandi(
    notendanafn varchar(50) not null,
    lykilord varchar(50) not null,
    netfang varchar(50) not null,
    nafn varchar(50) not null,
    simanumer varchar(50) not null,
    dob DATE not null,
    tegundnotanda int not null,
    primary key(notendanafn),
    FOREIGN KEY (tegundnotanda) REFERENCES TegundNotanda(tegundnotanda)
)

-- create table TegundNotanda that stores all user types
create table TegundNotanda(
    tegundnotanda int not null,
    tegund varchar(50) not null,
    primary key(tegundnotanda)
)

insert into TegundNotanda values(0, "Kennari");
insert into TegundNotanda values(1, "Nemandi");

-- create table hopur that has all groups of students and their teachers

create table Hopur (
    ID int not null,
    nafnhops varchar(255),
    notendaID varchar(50) not null,
    FOREIGN KEY (notendaID) REFERENCES notandi(notendanafn)
)

-- create table SpurningaTegundir that stores the different types of questions
create table SpurningaTegundir(
    tegund int not null,
    tegundspurningar varchar(50) not null,
    primary key(tegund)
)

insert into SpurningaTegundir values(0, "Fjölvalsspurning");
insert into SpurningaTegundir values(1, "Myndaspurning");
insert into SpurningaTegundir values(2, "Textaspurning");

-- create table Bok that stores the different books and info on that book
create table Bok(
    ID int auto_increment,
    nafnbokar varchar(255) not null,
    hofundur varchar(255) not null,
    utgafuar varchar(4) not null,
    primary key (ID)
)

-- create table spurningar that stores the different questions
create table spurningar (
    ID int auto_increment,
    spurning varchar(255) not null,
    rettSvar varchar(255) not null,
    spurningategund int not null,
    bokID int not null,
    primary key(ID),
    FOREIGN KEY (spurningategund) REFERENCES SpurningaTegundir(tegund),
    FOREIGN KEY (bokID) REFERENCES Bok(ID)
)




