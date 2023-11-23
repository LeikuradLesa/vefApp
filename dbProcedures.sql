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
DELIMITER $$
CREATE PROCEDURE InsertIntoNotandi(IN p_notendanafn VARCHAR(50), IN p_lykilord VARCHAR(50), IN p_netfang VARCHAR(50), IN p_nafn VARCHAR(50), IN p_simanumer VARCHAR(50), IN p_dob DATE, IN p_tegundnotanda INT)
BEGIN
    INSERT INTO notandi(notendanafn, lykilord, netfang, nafn, simanumer, dob, tegundnotanda) VALUES (p_notendanafn, p_lykilord, p_netfang, p_nafn, p_simanumer, p_dob, p_tegundnotanda);
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE InsertIntoBok(IN p_nafnbokar VARCHAR(255), IN p_hofundur VARCHAR(255), IN p_utgafuar VARCHAR(4))
BEGIN
    INSERT INTO bok(nafnbokar, hofundur, utgafuar) VALUES (p_nafnbokar, p_hofundur, p_utgafuar);
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE InsertIntoHopur(IN p_ID int, IN p_nafnhops VARCHAR(255), IN p_notendaID VARCHAR(50))
BEGIN
    INSERT INTO hopur(ID, nafnhops, notendaID) VALUES (p_ID, p_nafnhops, p_notendaID);
END $$
DELIMITER ;



