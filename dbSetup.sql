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
    ID int auto_increment,
    nafnhops varchar(50) not null,
    notendanafn varchar(50) not null,
    notendanafnKennara varchar(50) not null,
    bokID int not null,
    primary key(ID),
    FOREIGN KEY (notendanafn) REFERENCES notandi(notendanafn),
    FOREIGN KEY (notendanafnKennara) REFERENCES notandi(notendanafn),
    FOREIGN KEY (bokID) REFERENCES Bok(ID)
)

drop table Hopur;

-- create table Bok that stores the different books and info on that book
create table Bok(
    ID int auto_increment,
    nafnbokar varchar(255) not null,
    hofundur varchar(255) not null,
    utgafuar varchar(4) not null,
    primary key (ID)
)

-- test data 
insert into Bok values(2, "ljónið og kötturinn", "Heimir", "2021");
insert into Bok values(3, "madagaskar", "Arnar", "2020");

create table kaflar (
    kafliID int auto_increment,
    bokID int not null,
    kaflanumer int not null,
    kaflanafn varchar(255),
    foreign key (bokID) references Bok(ID),
    primary key (kafliID)
)

create table fjolsvarspurningar (
    spurning_ID int auto_increment,
    bokID int not null,
    kaflaID int not null,
    spurning varchar(255) not null,
    valkostur1 varchar(255) not null,
    valkostur2 varchar(255) not null,
    valkostur3 varchar(255),
    valkostur4 varchar(255),
    rettsvar varchar(1) not null,
    foreign key (bokID) references Bok(ID),
    foreign key (kaflaID) references kaflar(kafliID),
    primary key (spurning_ID)
)

create table userProgress (
    notendanafn varchar(50) not null,
    bokID int not null,
    kaflaID int not null,
    siduNumer int not null,
    foreign key (notendanafn) references notandi(notendanafn),
    foreign key (bokID) references Bok(ID),
    foreign key (kaflaID) references kaflar(kafliID)
)


