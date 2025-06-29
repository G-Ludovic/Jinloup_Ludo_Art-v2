create table user (
  id int unsigned primary key auto_increment not null,
  email varchar(255) not null unique,
  password varchar(500) not null
);

insert into user(id, email, password)
values
  (1, "jdoe@mail.com", "123456");

