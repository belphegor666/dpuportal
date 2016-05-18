# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table certification (
  certification_id          bigint auto_increment not null,
  percent_complete          float,
  certificate               varchar(255),
  user_id                   bigint,
  constraint pk_certification primary key (certification_id))
;

create table code_book (
  id                        bigint auto_increment not null,
  type                      varchar(255) not null,
  lookup_code               varchar(255) not null,
  description               varchar(255) not null,
  short_desc                varchar(255),
  display_order             integer,
  constraint pk_code_book primary key (id))
;

create table project (
  project_id                bigint auto_increment not null,
  title                     varchar(255) not null,
  summary                   varchar(255) not null,
  additional_information    varchar(255),
  revenue                   decimal(38),
  margin                    decimal(38),
  cost_savings              decimal(38),
  efficiency                float,
  cost_code                 varchar(255),
  target_date               timestamp,
  created_date              timestamp,
  status                    varchar(100),
  project_type              varchar(255),
  funding_type              varchar(255),
  max_budget                varchar(255),
  tech_stack                varchar(255),
  product_owner             varchar(255),
  approved_by               bigint,
  project_code              varchar(255),
  document_url              varchar(255),
  user_id                   bigint,
  constraint pk_project primary key (project_id))
;

create table release_history (
  id                        bigint auto_increment not null,
  version                   varchar(255),
  type                      varchar(255),
  description               varchar(255),
  version_date              timestamp,
  constraint pk_release_history primary key (id))
;

create table showcase (
  showcase_id               bigint auto_increment not null,
  title                     varchar(255),
  description               varchar(255),
  page_url                  varchar(255),
  image_url                 varchar(255),
  media_url                 varchar(255),
  category                  varchar(255),
  project_code              varchar(255),
  constraint pk_showcase primary key (showcase_id))
;

create table sprint (
  sprint_id                 bigint auto_increment not null,
  title                     varchar(255),
  description               varchar(255),
  start_date                timestamp not null,
  end_date                  timestamp not null,
  sprint_no                 integer,
  project_id                bigint not null,
  constraint pk_sprint primary key (sprint_id))
;

create table sprint_user (
  sprint_id                 bigint,
  user_id                   bigint,
  role                      varchar(255),
  constraint pk_sprint_user primary key (sprint_id, user_id))
;

create table story (
  story_id                  bigint auto_increment not null,
  epic                      varchar(255),
  story_details             varchar(255),
  trello_link               varchar(255),
  story_points              varchar(255),
  priority                  varchar(255),
  assigned_to               varchar(255),
  created_by                varchar(255),
  status                    varchar(255),
  sprint_id                 bigint not null,
  constraint pk_story primary key (story_id))
;

create table story_member (
  story_member_id           bigint auto_increment not null,
  email                     varchar(255),
  role                      varchar(255),
  story_id                  bigint,
  constraint pk_story_member primary key (story_member_id))
;

create table user (
  user_id                   bigint auto_increment not null,
  title                     varchar(50),
  first_name                varchar(50) not null,
  last_name                 varchar(50) not null,
  telephone                 varchar(20),
  email                     varchar(100) not null,
  password                  varchar(255) not null,
  activation_key            varchar(255),
  job_title                 varchar(100),
  role                      varchar(5),
  activated                 boolean,
  reset_password_key        varchar(255),
  home_page_preference      varchar(11),
  twitter_url               varchar(255),
  linked_in_url             varchar(255),
  created_date              timestamp,
  constraint ck_user_role check (role in ('USER','ADMIN')),
  constraint ck_user_home_page_preference check (home_page_preference in ('WELCOME','REQUIREMENT','DEVELOPER','PROJECT','EXECUTIVE')),
  constraint uq_user_email unique (email),
  constraint pk_user primary key (user_id))
;

create table whitelist (
  id                        bigint auto_increment not null,
  domain_name               varchar(255),
  constraint pk_whitelist primary key (id))
;

create sequence sprint_user_seq;

alter table certification add constraint fk_certification_user_1 foreign key (user_id) references user (user_id) on delete restrict on update restrict;
create index ix_certification_user_1 on certification (user_id);
alter table project add constraint fk_project_user_2 foreign key (user_id) references user (user_id) on delete restrict on update restrict;
create index ix_project_user_2 on project (user_id);
alter table sprint add constraint fk_sprint_project_3 foreign key (project_id) references project (project_id) on delete restrict on update restrict;
create index ix_sprint_project_3 on sprint (project_id);
alter table sprint_user add constraint fk_sprint_user_sprint_4 foreign key (sprint_id) references sprint (sprint_id) on delete restrict on update restrict;
create index ix_sprint_user_sprint_4 on sprint_user (sprint_id);
alter table sprint_user add constraint fk_sprint_user_user_5 foreign key (user_id) references user (user_id) on delete restrict on update restrict;
create index ix_sprint_user_user_5 on sprint_user (user_id);
alter table story add constraint fk_story_sprint_6 foreign key (sprint_id) references sprint (sprint_id) on delete restrict on update restrict;
create index ix_story_sprint_6 on story (sprint_id);
alter table story_member add constraint fk_story_member_story_7 foreign key (story_id) references story (story_id) on delete restrict on update restrict;
create index ix_story_member_story_7 on story_member (story_id);



# --- !Downs

SET REFERENTIAL_INTEGRITY FALSE;

drop table if exists certification;

drop table if exists code_book;

drop table if exists project;

drop table if exists release_history;

drop table if exists showcase;

drop table if exists sprint;

drop table if exists sprint_user;

drop table if exists story;

drop table if exists story_member;

drop table if exists user;

drop table if exists whitelist;

SET REFERENTIAL_INTEGRITY TRUE;

drop sequence if exists sprint_user_seq;

