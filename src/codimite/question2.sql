
-- create schema
CREATE SCHEMA codimite;

CREATE TABLE codimite.question2 (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    students VARCHAR(255) NOT NULL,
    grades INT NOT NULL,
    assignments VARCHAR(255) NOT NULL,
    lecture VARCHAR(255) ,
)

--  display all student
SELECT * FROM codimite.question2; 

-- display grades
SELECT grades FROM codimite.question2;