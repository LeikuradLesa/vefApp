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
    v_nafnbokar varchar(255) not null,
    primary key(ID),
    FOREIGN KEY (notendanafn) REFERENCES notandi(notendanafn),
    FOREIGN KEY (notendanafnKennara) REFERENCES notandi(notendanafn),
    FOREIGN KEY (v_nafnbokar) REFERENCES Bok(nafnbokar)
)

drop table Hopur;

insert into Hopur (nafnhops, notendanafn, notendanafnKennara, bokID) values
("GE", "HeimirG","Andrés", 1);

-- create table Bok that stores the different books and info on that book
create table Bok(
    nafnbokar varchar(255) not null,
    hofundur varchar(255) not null,
    utgafuar varchar(4) not null,
    primary key (nafnbokar)
)

drop table Bok;

-- test data 
INSERT INTO Bok (nafnbokar, hofundur, utgafuar) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', '1925'),
('To Kill a Mockingbird', 'Harper Lee', '1960'),
('1984', 'George Orwell', '1949'),
('Pride and Prejudice', 'Jane Austen', '1813'),
('The Catcher in the Rye', 'J.D. Salinger', '1951');

create table Kaflar (
    kafliID int auto_increment,
    v_nafnbokar varchar(255) not null,
    kaflanumer int not null,
    kaflanafn varchar(255),
    foreign key (v_nafnbokar) references Bok(nafnbokar),
    primary key (kafliID)
)

drop table Kaflar;

create table Fjolsvarspurningar (
    spurning_ID int auto_increment,
    v_nafnbokar varchar(255) not null,
    kaflaID int not null,
    spurning varchar(255) not null,
    valkostur1 varchar(255) not null,
    valkostur2 varchar(255) not null,
    valkostur3 varchar(255),
    valkostur4 varchar(255),
    rettsvar varchar(1) not null,
    foreign key (v_nafnbokar) references Bok(nafnbokar),
    foreign key (kaflaID) references Kaflar(kafliID),
    primary key (spurning_ID)
)

drop table Fjolsvarspurningar;

create table userProgress (
    notendanafn varchar(50) not null,
    v_nafnbokar varchar(255) not null,
    kaflaID int not null,
    siduNumer int not null,
    foreign key (notendanafn) references notandi(notendanafn),
    foreign key (v_nafnbokar) references Bok(nafnbokar),
    foreign key (kaflaID) references Kaflar(kafliID)
)

drop table userProgress;

-- Sample data for Books
INSERT INTO Bok (nafnbokar, hofundur, utgafuar) VALUES
    ('Database Fundamentals', 'John Smith', '2020'),
    ('Data Structures and Algorithms', 'Jane Doe', '2019');

-- Sample data for Chapters
INSERT INTO Kaflar (kafliID, v_nafnbokar, kaflanumer, kaflanafn) values
    (1, "Data Structures and Algorithms", 1, 'Introduction'),
    (2, "Data Structures and Algorithms", 2, 'Database Design'),
    (3, "Database Fundamentals", 1, 'Introduction'),
    (4, "Database Fundamentals", 2, 'Sorting Algorithms');

-- Sample data for Multiple-Choice Questions
INSERT INTO Fjolsvarspurningar (spurning_ID, v_nafnbokar, kaflaID, spurning, valkostur1, valkostur2, valkostur3, valkostur4, rettsvar) VALUES
    (1, "Data Structures and Algorithms", 1, 'What is a database?', 'A collection of related data', 'A collection of unrelated data', 'A collection of related tables', 'A collection of unrelated tables', '0'),
    (2, "Data Structures and Algorithms", 1, 'What is a database management system?', 'A software that manages databases', 'A software that manages tables', 'A software that manages data', 'A software that manages data and tables', '3'),
    (3, "Data Structures and Algorithms", 2, 'What is a database schema?', 'A collection of related data', 'A collection of unrelated data', 'A collection of related tables', 'A collection of unrelated tables', '2'),
    (4, "Data Structures and Algorithms", 2, 'What is a database instance?', 'A collection of related data', 'A collection of unrelated data', 'A collection of related tables', 'A collection of unrelated tables', '0'),
    (5, "Database Fundamentals", 3, 'What is a sorting algorithm?', 'An algorithm that sorts data', 'An algorithm that sorts tables', 'An algorithm that sorts databases', 'An algorithm that sorts data and tables', '0'),
    (6, "Database Fundamentals", 3, 'What is a stable sorting algorithm?', 'An algorithm that sorts data', 'An algorithm that sorts tables', 'An algorithm that sorts databases', 'An algorithm that sorts data and tables', '3'),
    (7, "Database Fundamentals", 4, 'What is a comparison-based sorting algorithm?', 'An algorithm that sorts data', 'An algorithm that sorts tables', 'An algorithm that sorts databases', 'An algorithm that sorts data and tables', '0'),
    (8, "Database Fundamentals", 4, 'What is a non-comparison-based sorting algorithm?', 'An algorithm that sorts data', 'An algorithm that sorts tables', 'An algorithm that sorts databases', 'An algorithm that sorts data and tables', '3');


-- Sample data for User Progress
INSERT INTO userProgress (notendanafn, v_nafnbokar, kaflaID, siduNumer) VALUES
    ('Bjarnason', "Data Structures and Algorithms", 1, 1),
    ('Bjarnason', "Database Fundamentals", 3, 1),
    ('Dagsson', "Data Structures and Algorithms", 1, 1),
    ('Dagsson', "Database Fundamentals", 3, 1),
    ('Einarsson', "Data Structures and Algorithms", 1, 1),
    ('Einarsson', "Database Fundamentals", 4, 2),
    ('Finnsson', "Data Structures and Algorithms", 1, 1),
    ('Finnsson', "Database Fundamentals", 3, 1),
    ('Gunnarsson', "Data Structures and Algorithms", 1, 1),
    ('Gunnarsson', "Database Fundamentals", 3, 1),
    ('Hjartarson', "Data Structures and Algorithms", 1, 1),
    ('Hjartarson', "Database Fundamentals", 3, 1),
    ('Ingolfsson', "Data Structures and Algorithms", 2, 1),
    ('Ingolfsson', "Database Fundamentals", 4, 1),
    ('Johannsson', "Data Structures and Algorithms", 2, 1),
    ('Johannsson', "Database Fundamentals", 4, 1);

insert into userProgress (notendanafn, v_nafnbokar, kaflaID, siduNumer) VALUES
("Addi1111", "Database Fundamentals", 1, 1);


call InsertIntoHopur ("GE","HeimirG", "Andrés", "Pride and Prejudice");



