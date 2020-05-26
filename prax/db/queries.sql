
USE Alt_SXSW_db;

CREATE TABLE User
(
	id int NOT NULL AUTO_INCREMENT,
	firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
	username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	bandname varchar(255) NOT NULL,
	instrument varchar(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);

/*create table message*/
CREATE TABLE message(
    id int auto_increment NOT NULL,
    origin int NOT NULL,
    content varchar(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    seen boolean DEFAULT false,
    PRIMARY KEY (id)
);

/*create table relations*/
CREATE TABLE relation(
    id int auto_increment NOT NULL,
    origin int NOT NULL,
    -- lastmessage int NOT NULL,
    unseencount int NOT NULL,
    PRIMARY KEY (id)
);



