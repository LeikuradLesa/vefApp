-- Active: 1700573522610@@leikuradlesa.cxafacplwecg.eu-north-1.rds.amazonaws.com@3306@LeikuradLesa

-- Create a stored procedure that takes in a users notendanafna and lykilord and it checks the tegundnotanda to see if a user is a kennari or a nemandi
-- if the user is a kennari it returns 1 if a nemandi it returns 0 and if anything elsa it returns -1
DELIMITER $$
CREATE PROCEDURE Login(IN p_username VARCHAR(50), IN p_password VARCHAR(50))
BEGIN
    DECLARE v_tegundnotanda INT DEFAULT -1;
    
    SELECT tegundnotanda INTO v_tegundnotanda FROM notandi WHERE notendanafn = p_username AND lykilord = p_password;

    SELECT v_tegundnotanda AS result;
END $$
DELIMITER ;

-- Create stored procedure for notandi table
create procedure InsertIntoNotandi(IN )

-- Create stored procedure for TegundNotanda table
DELIMITER $$
CREATE PROCEDURE InsertTegundNotanda(IN p_tegundnotanda INT, IN p_tegund VARCHAR(50))
BEGIN
    INSERT INTO TegundNotanda (tegundnotanda, tegund) VALUES (p_tegundnotanda, p_tegund);
END $$
DELIMITER ;

-- Create stored procedure for Hopur table
DELIMITER $$
CREATE PROCEDURE InsertIntoHopur (IN p_nafnhops VARCHAR(50), IN p_notendanafn VARCHAR(50), IN p_notendanafnkennara VARCHAR(50), p_nafnbokar varchar(255))
BEGIN
    INSERT INTO Hopur(nafnhops, notendanafn, notendanafnKennara, v_nafnbokar) VALUES (p_nafnhops, p_notendanafn, p_notendanafnKennara, p_nafnbokar);
    select p_notendanafn AS result;
END $$
DELIMITER ;


call InsertIntoHopur ("Bruh2", "Arnar", "AlliG", "Data Structures and Algorithms");

drop procedure InsertIntoHopur;

-- Create stored procedure for SpurningaTegundir table
DELIMITER $$
CREATE PROCEDURE InsertSpurningaTegundir(IN p_tegund INT, IN p_tegundspurningar VARCHAR(50))
BEGIN
    INSERT INTO SpurningaTegundir (tegund, tegundspurningar) VALUES (p_tegund, p_tegundspurningar);
END $$
DELIMITER ;

-- Create stored procedure for Bok table
DELIMITER $$
CREATE PROCEDURE InsertIntoBok(IN p_nafnbokar VARCHAR(255), IN p_hofundur VARCHAR(255), IN p_utgafuar VARCHAR(4))
BEGIN
    INSERT INTO Bok (nafnbokar, hofundur, utgafuar) VALUES (p_nafnbokar, p_hofundur, p_utgafuar);
END $$
DELIMITER ;

drop procedure InsertIntoBok;

-- spurninga tafla
DELIMITER $$
create procedure InsertIntoSpurningar2(In p_nafnbokar varchar(255), p_kaflaID int, p_spurning VARCHAR(255), p_valkostur1 varchar(255), p_valkostur2 varchar(255), p_rettsvar varchar(1))
BEGIN
    INSERT INTO Fjolsvarspurningar(v_nafnbokar, kaflaID, spurning, Valkostur1, valkostur2, rettsvar) values (p_nafnbokar, p_kaflaID, p_spurning, p_valkostur1, p_valkostur2, p_rettsvar);
END $$
DELIMITER ;

drop procedure InsertIntoSpurningar2;

DELIMITER $$
create procedure InsertIntoSpurningar3(In p_nafnbokar varchar(255), p_kaflaID int, p_spurning VARCHAR(255), p_valkostur1 varchar(255), p_valkostur2 varchar(255), p_valkostur3 varchar(255), p_rettsvar varchar(1))
BEGIN
    INSERT INTO Fjolsvarspurningar(v_nafnbokar, kaflaID, spurning, Valkostur1, valkostur2, rettsvar) values (p_nafnbokar, p_kaflaID, p_spurning, p_valkostur1, p_valkostur2, p_valkostur3, p_rettsvar);
END $$
DELIMITER ;

drop procedure InsertIntoSpurningar3;

DELIMITER $$
create procedure InsertIntoSpurningar4(In p_nafnbokar varchar(255), p_kaflaID int, p_spurning VARCHAR(255), p_valkostur1 varchar(255), p_valkostur2 varchar(255), p_valkostur3 varchar(255), p_valkostur4 varchar(255), p_rettsvar varchar(1))
BEGIN
    INSERT INTO Fjolsvarspurningar(v_nafnbokar, kaflaID, spurning, Valkostur1, valkostur2, rettsvar) values (p_nafnbokar, p_kaflaID, p_spurning, p_valkostur1, p_valkostur2, p_valkostur3, p_valkostur4, p_rettsvar);
END $$
DELIMITER ;

drop procedure InsertIntoSpurningar4;

-- insert the test data into the table notandi and make sure to use the same notendanafn in the table Hopur
INSERT INTO notandi (notendanafn, lykilord, netfang, nafn, simanumer, dob, tegundnotanda) values
("Bjarnason", "123", "Bjarnason@gmail.com", "Bjarni Bjarnason", "1234567", "1990-01-01", 1),
("Dagsson", "123", "Dagsson@gmail.com", "Dagur Dagsson", "1234567", "1990-01-01", 1),
("Einarsson", "123", "Einarsson@gmail.com", "Einar Einarsson", "1234567", "1990-01-01", 1),
("Finnsson", "123", "Finnsson@gmail.com", "Finnur Finnsson", "1234567", "1990-01-01", 1),
("Gunnarsson", "123", "Gunnarsson@gmail.com", "Gunnar Gunnarsson", "1234567", "1990-01-01", 1),
("Hjartarson", "123", "Hjartarson@gmail.com", "Hjartarson Hjartarson", "1234567", "1990-01-01", 1),
("Ingolfsson", "123", "Ingolfsson@gmail.com", "Ingolfur Ingolfsson", "1234567", "1990-01-01", 1),
("Johannsson", "123", "Johannsson@gmail.com", "Johann Johannsson", "1234567", "1990-01-01", 1),
("Karlsson", "123", "Karlsson@gmail.com", "Karl Karlsson", "1234567", "1990-01-01", 1);
-- insert test data into `Hopur` table
/* INSERT INTO Hopur (nafnhops, notendanafn, notendanafnKennara, bokID) values 
("GRE", "Bjarnason", "Andrés", 2),
("GRE", "Dagsson", "Andrés", 3),
("GRE", "Einarsson", "Andrés", 3),
("GRE", "Finnsson", "Andrés", 3),
("GRE", "Gunnarsson", "Andrés", 3),
("GRE", "Hjartarson", "Andrés", 3),
("GRE", "Ingolfsson", "Andrés", 2),
("GRE", "Johannsson", "Andrés", 2),
("GRE", "Karlsson", "Andrés", 2);

-- add more data so that all the above are reading 2 books
INSERT INTO Hopur (nafnhops, notendanafn, notendanafnKennara, bokID) values 
("GRE2", "Bjarnason", "Andrés", 1),
("GRE2", "Dagsson", "Andrés", 1),
("GRE2", "Einarsson", "Andrés", 1),
("GRE3", "Finnsson", "Andrés", 1),
("GRE3", "Gunnarsson", "Andrés", 8),
("GRE4", "Hjartarson", "Björn", 1),
("GRE5", "Ingolfsson", "Björn", 1),
("GRE7", "Johannsson", "Björn", 1),
("GRE6", "Karlsson", "Björn", 1); */  -- G-mul prufu gögn ef þu vilt nota þarf að breyta bokID í v_nafnbokar og varchar(255) svo láta valid bók

select * from Hopur;

-- add a Kennari to the notandi system
INSERT INTO notandi (notendanafn, lykilord, netfang, nafn, simanumer, dob, tegundnotanda) values
("Andrés", "123", "Andrésson@gmail.com", "Andrés Andrésson", "1234567", "1990-01-01", 0),
("Björn", "123", "Björnsson@gmail.com", "Björn Björnsson", "1234567", "1990-01-01", 0);

-- Create stored procedure that shows all the hopur where a person is using the notendanafn
DELIMITER $$
CREATE PROCEDURE Showbooks(IN p_notendanafn VARCHAR(50))
-- It needs to return a list of nafnbokar in the Bok table and it can only be the ones the student is a part of
BEGIN 
    select Bok.nafnbokar, userProgress.kaflaID, userProgress.siduNumer 
    from Bok 
    INNER JOIN userProgress ON Bok.nafnbokar=userProgress.v_nafnbokar
    where userProgress.notendanafn=p_notendanafn
    group by userProgress.v_nafnbokar;
END $$
DELIMITER ;

drop procedure Showbooks;

call Showbooks ("Addi");

-- Create stored procedure that shows all the Hopur where a kennari is part of the kennaranotendanafn ADD
DELIMITER $$
CREATE PROCEDURE ShowHopur(IN p_kennaranotendanafn VARCHAR(50))
-- It needs to return a list of nafnhops in the Hopur table and it can only be the ones the kennari is a part of and should be grouped so it will not show the same group many times
BEGIN
    SELECT nafnhops FROM Hopur WHERE notendanafnKennara = p_kennaranotendanafn GROUP BY nafnhops;
END $$
DELIMITER ;

call ShowHopur ("AlliG");

-- create a stored procedure that return the notendannafn of all the students where there kennari is the kennaranotendanafn
DELIMITER $$
CREATE PROCEDURE ShowStudents(IN p_kennaranotendanafn VARCHAR(50))
-- needs to return a list of the studnets notendanafn and book name and be sorted by there name so that duplicate names are easier to read
BEGIN
    SELECT Hopur.notendanafn, Bok.nafnbokar FROM notandi, Hopur, Bok WHERE notandi.notendanafn = Hopur.notendanafn AND Hopur.v_nafnbokar = Bok.nafnbokar AND Hopur.notendanafnKennara = p_kennaranotendanafn ORDER BY notandi.nafn;
END $$
DELIMITER ;

drop procedure ShowStudents;

call ShowStudents ("AlliG");
