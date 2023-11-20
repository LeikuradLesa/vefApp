-- Active: 1699365169542@@leikuradlesa.cxafacplwecg.eu-north-1.rds.amazonaws.com@3306@LeikuradLesa

-- Create a procedure to check if the notendanafn and lykilord is correct and has a tegundnotanda = 0
-- if the password and notendanafn is correct return 1 and if not return -1
DELIMITER //
CREATE PROCEDURE CheckKennari(IN p_password VARCHAR(50), IN p_username VARCHAR(50))
BEGIN
    DECLARE v_tegundnotanda INT;
    SELECT tegundnotanda INTO v_tegundnotanda FROM notandi WHERE notendanafn = p_username AND lykilord = p_password;
    IF v_tegundnotanda = 0 THEN
        SELECT 1 AS result;
    ELSE
        SELECT -1 AS result;
    END IF;
END //
DELIMITER ;

-- Create a procedure to check if the notendanafn and lykilord is correct and has a tegundnotanda = 1
-- if the password and notendanafn is correct return 1 and if not return -1
DELIMITER //
CREATE PROCEDURE CheckNemandi(IN p_password VARCHAR(50), IN p_username VARCHAR(50))
BEGIN
    DECLARE v_tegundnotanda INT;
    SELECT tegundnotanda INTO v_tegundnotanda FROM notandi WHERE notendanafn = p_username AND lykilord = p_password;
    IF v_tegundnotanda = 1 THEN
        SELECT 1 AS result;
    ELSE
        SELECT -1 AS result;
    END IF;
END //
DELIMITER ;




