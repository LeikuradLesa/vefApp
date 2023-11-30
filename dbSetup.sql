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

create table Kaflar (
    kafliID int auto_increment,
    bokID int not null,
    kaflanumer int not null,
    kaflanafn varchar(255),
    foreign key (bokID) references Bok(ID),
    primary key (kafliID)
)

create table Fjolsvarspurningar (
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
    foreign key (kaflaID) references Kaflar(kafliID),
    primary key (spurning_ID)
)

create table userProgress (
    notendanafn varchar(50) not null,
    bokID int not null,
    kaflaID int not null,
    siduNumer int not null,
    foreign key (notendanafn) references notandi(notendanafn),
    foreign key (bokID) references Bok(ID),
    foreign key (kaflaID) references Kaflar(kafliID)
)

-- Sample data for Books
INSERT INTO Bok (nafnbokar, hofundur, utgafuar) VALUES
    ('Database Fundamentals', 'John Smith', '2020'),
    ('Data Structures and Algorithms', 'Jane Doe', '2019');

-- Sample data for Chapters
INSERT INTO Kaflar (kafliID, bokID, kaflanumer, kaflanafn) values
    (1, 1, 1, 'Introduction'),
    (2, 1, 2, 'Database Design'),
    (3, 2, 1, 'Introduction'),
    (4, 2, 2, 'Sorting Algorithms');

-- Sample data for Multiple-Choice Questions
INSERT INTO Fjolsvarspurningar (spurning_ID, bokID, kaflaID, spurning, valkostur1, valkostur2, valkostur3, valkostur4, rettsvar) VALUES
    (1, 1, 1, 'What is a database?', 'A collection of related data', 'A collection of unrelated data', 'A collection of related tables', 'A collection of unrelated tables', 'A'),
    (2, 1, 1, 'What is a database management system?', 'A software that manages databases', 'A software that manages tables', 'A software that manages data', 'A software that manages data and tables', 'D'),
    (3, 1, 2, 'What is a database schema?', 'A collection of related data', 'A collection of unrelated data', 'A collection of related tables', 'A collection of unrelated tables', 'C'),
    (4, 1, 2, 'What is a database instance?', 'A collection of related data', 'A collection of unrelated data', 'A collection of related tables', 'A collection of unrelated tables', 'A'),
    (5, 2, 3, 'What is a sorting algorithm?', 'An algorithm that sorts data', 'An algorithm that sorts tables', 'An algorithm that sorts databases', 'An algorithm that sorts data and tables', 'A'),
    (6, 2, 3, 'What is a stable sorting algorithm?', 'An algorithm that sorts data', 'An algorithm that sorts tables', 'An algorithm that sorts databases', 'An algorithm that sorts data and tables', 'D'),
    (7, 2, 4, 'What is a comparison-based sorting algorithm?', 'An algorithm that sorts data', 'An algorithm that sorts tables', 'An algorithm that sorts databases', 'An algorithm that sorts data and tables', 'A'),
    (8, 2, 4, 'What is a non-comparison-based sorting algorithm?', 'An algorithm that sorts data', 'An algorithm that sorts tables', 'An algorithm that sorts databases', 'An algorithm that sorts data and tables', 'D');



-- Sample data for User Progress
INSERT INTO userProgress (notendanafn, bokID, kaflaID, siduNumer) VALUES
    ('Bjarnason', 1, 1, 1),
    ('Bjarnason', 1, 1, 2),
    ('Bjarnason', 1, 2, 1),
    ('Bjarnason', 1, 2, 2),
    ('Bjarnason', 2, 3, 1),
    ('Bjarnason', 2, 3, 2),
    ('Bjarnason', 2, 4, 1),
    ('Bjarnason', 2, 4, 2),
    ('Dagsson', 1, 1, 1),
    ('Dagsson', 1, 1, 2),
    ('Dagsson', 1, 2, 1),
    ('Dagsson', 1, 2, 2),
    ('Dagsson', 2, 3, 1),
    ('Dagsson', 2, 3, 2),
    ('Dagsson', 2, 4, 1),
    ('Dagsson', 2, 4, 2),
    ('Einarsson', 1, 1, 1),
    ('Einarsson', 1, 1, 2),
    ('Einarsson', 1, 2, 1),
    ('Einarsson', 1, 2, 2),
    ('Einarsson', 2, 3, 1),
    ('Einarsson', 2, 3, 2),
    ('Einarsson', 2, 4, 1),
    ('Einarsson', 2, 4, 2),
    ('Finnsson', 1, 1, 1),
    ('Finnsson', 1, 1, 2),
    ('Finnsson', 1, 2, 1),
    ('Finnsson', 1, 2, 2),
    ('Finnsson', 2, 3, 1),
    ('Finnsson', 2, 3, 2),
    ('Finnsson', 2, 4, 1),
    ('Finnsson', 2, 4, 2),
    ('Gunnarsson', 1, 1, 1),
    ('Gunnarsson', 1, 1, 2),
    ('Gunnarsson', 1, 2, 1),
    ('Gunnarsson', 1, 2, 2),
    ('Gunnarsson', 2, 3, 1),
    ('Gunnarsson', 2, 3, 2),
    ('Gunnarsson', 2, 4, 1),
    ('Gunnarsson', 2, 4, 2),
    ('Hjartarson', 1, 1, 1),
    ('Hjartarson', 1, 1, 2),
    ('Hjartarson', 1, 2, 1),
    ('Hjartarson', 1, 2, 2),
    ('Hjartarson', 2, 3, 1),
    ('Hjartarson', 2, 3, 2),
    ('Hjartarson', 2, 4, 1),
    ('Hjartarson', 2, 4, 2),
    ('Ingolfsson', 1, 1, 1),
    ('Ingolfsson', 1, 1, 2),
    ('Ingolfsson', 1, 2, 1),
    ('Ingolfsson', 1, 2, 2),
    ('Ingolfsson', 2, 3, 1),
    ('Ingolfsson', 2, 3, 2),
    ('Ingolfsson', 2, 4, 1),
    ('Ingolfsson', 2, 4, 2),
    ('Johannsson', 1, 1, 1),
    ('Johannsson', 1, 1, 2),
    ('Johannsson', 1, 2, 1),
    ('Johannsson', 1, 2, 2),
    ('Johannsson', 2, 3, 1),
    ('Johannsson', 2, 3, 2),
    ('Johannsson', 2, 4, 1);
