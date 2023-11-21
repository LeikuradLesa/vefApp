
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



