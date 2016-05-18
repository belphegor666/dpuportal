alter table user add column home_page_preference varchar(100);
alter table user drop column preferences;
alter table user drop column reset_password_datetime;

create table whitelist (
  id                        bigint auto_increment not null,
  domain_name               varchar(50) not null,
  constraint pk_whitelist primary key (id))
;