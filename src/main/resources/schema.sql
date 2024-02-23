create table users(
  id int not null AUTO_INCREMENT,
  username varchar(30) not null,
  email varchar(30),
  password varchar(30),
  role varchar(10),
  PRIMARY KEY ( id )
);