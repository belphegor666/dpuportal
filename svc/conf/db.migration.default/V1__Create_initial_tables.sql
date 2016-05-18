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
  target_date               datetime(6),
  created_date              datetime(6),
  status                    varchar(100),
  project_type              varchar(100),
  funding_type              varchar(100),
  max_budget                varchar(255),
  tech_stack                varchar(255),
  product_owner             varchar(100),
  approved_by               bigint,
  user_id                   bigint,
  constraint pk_project primary key (project_id))
;

create table sprint (
  sprint_id                 bigint auto_increment not null,
  title                     varchar(255),
  description               varchar(255),
  start_date                datetime(6) not null,
  end_date                  datetime(6) not null,
  sprint_no                 integer not null,
  project_id                bigint not null,
  constraint pk_sprint primary key (sprint_id))
;

create table sprint_user (
  sprint_id                 bigint,
  user_id                   bigint,
  constraint pk_sprint_user primary key (sprint_id, user_id))
;

create table user (
  user_id                   bigint auto_increment not null,
  title                     varchar(50),
  first_name                varchar(50) not null,
  last_name                 varchar(50) not null,
  telephone                 varchar(20),
  role                      varchar(100),
  email                     varchar(100) not null,
  password                  varchar(255) not null,
  activation_key            varchar(255),
  job_title                 varchar(100),
  activated                 tinyint(1) default 0,
  reset_password_key        varchar(255),
  reset_password_datetime   datetime(6),
  preferences               varchar(100),
  constraint uq_user_email unique (email),
  constraint pk_user primary key (user_id))
;

alter table project add constraint fk_project_user_1 foreign key (user_id) references user (user_id) on delete restrict on update restrict;
create index ix_project_user_1 on project (user_id);
alter table sprint add constraint fk_sprint_project_2 foreign key (project_id) references project (project_id) on delete restrict on update restrict;
create index ix_sprint_project_2 on sprint (project_id);
alter table sprint_user add constraint fk_sprint_user_sprint_3 foreign key (sprint_id) references sprint (sprint_id) on delete restrict on update restrict;
create index ix_sprint_user_sprint_3 on sprint_user (sprint_id);
alter table sprint_user add constraint fk_sprint_user_user_4 foreign key (user_id) references user (user_id) on delete restrict on update restrict;
create index ix_sprint_user_user_4 on sprint_user (user_id);