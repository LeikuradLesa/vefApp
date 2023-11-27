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

-- Create stored procedure for every table so it makes it easy to insert INTO
-- Create stored procedure for notandi table
DELIMITER $$
CREATE PROCEDURE InsertNotandi(IN p_notendanafn VARCHAR(50), IN p_lykilord VARCHAR(50), IN p_netfang VARCHAR(50), IN p_nafn VARCHAR(50), IN p_simanumer VARCHAR(50), IN p_dob DATE, IN p_tegundnotanda INT)
BEGIN
    INSERT INTO notandi (notendanafn, lykilord, netfang, nafn, simanumer, dob, tegundnotanda) VALUES (p_notendanafn, p_lykilord, p_netfang, p_nafn, p_simanumer, p_dob, p_tegundnotanda);
END $$
DELIMITER ;

-- Create stored procedure for TegundNotanda table
DELIMITER $$
CREATE PROCEDURE InsertTegundNotanda(IN p_tegundnotanda INT, IN p_tegund VARCHAR(50))
BEGIN
    INSERT INTO TegundNotanda (tegundnotanda, tegund) VALUES (p_tegundnotanda, p_tegund);
END $$
DELIMITER ;

-- Create stored procedure for Hopur table
DELIMITER $$
CREATE PROCEDURE InsertHopur(IN p_nafnhops VARCHAR(255), IN p_notendanafn VARCHAR(50), IN p_bokID INT)
BEGIN
    INSERT INTO Hopur (nafnhops, notendanafn, bokID) VALUES (p_nafnhops, p_notendanafn, p_bokID);
END $$
DELIMITER ;

-- Create stored procedure for SpurningaTegundir table
DELIMITER $$
CREATE PROCEDURE InsertSpurningaTegundir(IN p_tegund INT, IN p_tegundspurningar VARCHAR(50))
BEGIN
    INSERT INTO SpurningaTegundir (tegund, tegundspurningar) VALUES (p_tegund, p_tegundspurningar);
END $$
DELIMITER ;

-- Create stored procedure for Bok table
DELIMITER $$
CREATE PROCEDURE InsertBok(IN p_nafnbokar VARCHAR(255), IN p_hofundur VARCHAR(255), IN p_utgafuar VARCHAR(4))
BEGIN
    INSERT INTO Bok (nafnbokar, hofundur, utgafuar) VALUES (p_nafnbokar, p_hofundur, p_utgafuar);
END $$
DELIMITER ;


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
INSERT INTO Hopur (nafnhops, notendanafn, bokID) VALUES
("GRE", "Arnarison", 1),
("GRE", "Bjarnason", 1),
("GRE", "Dagsson", 1),
("GRE", "Einarsson", 1),
("GRE", "Finnsson", 1),
("GRE", "Gunnarsson", 1),
("GRE", "Hjartarson", 1),
("GRE", "Ingolfsson", 1),
("GRE", "Johannsson", 1),
("GRE", "Karlsson", 1),
("GRE2", "Arnarison", 2),
("GRE2", "Bjarnason", 2),
("GRE3", "Dagsson", 3),
("GRE3", "Einarsson", 3),
("GRE3", "Finnsson", 3),
("GRE3", "Gunnarsson", 3),
("GRE3", "Hjartarson", 3),
("GRE2", "Ingolfsson", 2),
("GRE2", "Johannsson", 2),
("GRE2", "Karlsson", 2);
-- do the same again but put some in different bokID
INSERT INTO Hopur (nafnhops, notendanafn, bokID) values 
("GRE2", "Arnarison", 2),
("GRE2", "Bjarnason", 2),
("GRE3", "Dagsson", 3),
("GRE3", "Einarsson", 3),
("GRE3", "Finnsson", 3),
("GRE3", "Gunnarsson", 3),
("GRE3", "Hjartarson", 3),
("GRE2", "Ingolfsson", 2),
("GRE2", "Johannsson", 2),
("GRE2", "Karlsson", 2);

-- Create stored procedure that shows all the hopur where a person is using the notendanafn
DELIMITER $$
CREATE PROCEDURE Showbooks(IN p_notendanafn VARCHAR(50))
-- It needs to return a list of nafnbokar in the Bok table and it can only be the ones the student is a part of
BEGIN
    SELECT nafnbokar FROM Bok WHERE ID IN (SELECT bokID FROM Hopur WHERE notendanafn = p_notendanafn);
END $$
DELIMITER ;

call Showbooks ("Dagsson");


