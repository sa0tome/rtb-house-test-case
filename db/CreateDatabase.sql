USE RTBSales;

CREATE TABLE Sellers (
    id int not null,
    name varchar(70) not null,
    PRIMARY KEY (id)
);

CREATE TABLE Orders (
    orderId int not null,
    product varchar(70) not null,
    country varchar(3) not null,
    price decimal(10,2) not null,
    seller int not null,
    PRIMARY KEY (orderId),
    FOREIGN KEY (seller) REFERENCES Sellers(id)
);

SET character_set_client = utf8;
SET character_set_connection = utf8;
SET character_set_results = utf8;
SET collation_connection = utf8_general_ci;

INSERT INTO `Sellers` (`name`,`id`)
    VALUES
    ('Seller #1',1),
    ('Seller #2',2),
    ('Seller #3',3),
    ('Seller #4',4);

INSERT INTO `Orders` (`orderId`,`product`,`seller`,`country`,`price`)
    VALUES
    (2019060001,'Laptop #1',1,'BRA',1000),
    (2019060002,'Laptop #2',2,'ARG',1250),
    (2019060003,'Laptop #3',3,'ARG',1900),
    (2019060004,'Printer #1',1,'MEX',199),
    (2019060005,'Smartphone #1',2,'BRA',999),
    (2019060006,'Printer #2',3,'BRA',399),
    (2019060007,'Smartphone #2',1,'ARG',1499),
    (2019060008,'Laptop #3',2,'ARG',1900),
    (2019060009,'Smartphone #1',3,'MEX',999),
    (2019060010,'Printer #2',1,'BRA',399),
    (2019060011,'Printer #3',2,'ARG',899),
    (2019060012,'Laptop #2',3,'MEX',1250),
    (2019060013,'Smartphone #1',1,'BRA',999),
    (2019060014,'Printer #1',2,'BRA',199),
    (2019060015,'Smartphone #3',3,'ARG',2399),
    (2019060016,'Laptop #3',1,'MEX',1900),
    (2019060017,'Smartphone #1',2,'BRA',999),
    (2019060018,'Laptop #3',3,'BRA',1900),
    (2019060019,'Smartphone #3',1,'BRA',2399),
    (2019060020,'Printer #1',2,'ARG',199),
    (2019060021,'Smartphone #2',3,'MEX',1499),
    (2019060022,'Laptop #3',1,'ARG',1900),
    (2019060023,'Printer #1',2,'MEX',199),
    (2019060024,'Smartphone #3',3,'BRA',2399),
    (2019060025,'Laptop #3',1,'BRA',1900);