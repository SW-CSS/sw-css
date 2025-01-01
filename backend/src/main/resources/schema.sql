drop table if exists sw_css.member;
drop table if exists sw_css.student_member;
drop table if exists sw_css.faculty_member;
drop table if exists sw_css.major;
drop table if exists sw_css.college;
drop table if exists sw_css.milestone;
drop table if exists sw_css.milestone_category;
drop table if exists sw_css.milestone_history;
drop table if exists sw_css.hackathon;
drop table if exists sw_css.hackathon_team;
drop table if exists sw_css.hackathon_team_vote;
drop table if exists sw_css.hackathon_team_member;

create table member
(
    id           bigint auto_increment primary key,
    email        varchar(255) not null,
    name         varchar(255) not null,
    password     varchar(255) not null,
    phone_number varchar(255) not null,
    is_deleted   boolean      not null,
    created_at   datetime(6)  not null default current_timestamp(6)
);

create table student_member
(
    id              bigint primary key,
    member_id       bigint       not null,
    major_id        bigint       not null,
    minor_id        bigint,
    double_major_id bigint,
    career          varchar(255) not null,
    career_detail   varchar(255) not null,
    created_at      datetime(6)  not null default current_timestamp(6)
);

create table faculty_member
(
    id         bigint auto_increment primary key,
    member_id  bigint      not null,
    created_at datetime(6) not null default current_timestamp(6)
);

create table major
(
    id         bigint auto_increment primary key,
    college_id bigint       not null,
    name       varchar(255) not null,
    created_at datetime(6)  not null default current_timestamp(6)
);

create table college
(
    id         bigint auto_increment primary key,
    name       varchar(255) not null,
    created_at datetime(6)  not null default current_timestamp(6)
);

create table milestone
(
    id          bigint auto_increment primary key,
    category_id bigint       not null,
    name        varchar(255) not null,
    score       int          not null,
    limit_count int          not null,
    created_at  datetime(6)  not null default current_timestamp(6)
);

create table milestone_category
(
    id              bigint auto_increment primary key,
    name            varchar(255) not null,
    milestone_group varchar(255) not null,
    limit_score     int          not null,
    created_at      datetime(6)  not null default current_timestamp(6)
);

create table milestone_history
(
    id            bigint auto_increment primary key,
    milestone_id  bigint       not null,
    student_id    int          not null,
    description   varchar(255) not null,
    file_url      varchar(255),
    status        varchar(255) not null default 'PENDING',
    reject_reason varchar(255),
    count         int          not null,
    activated_at  date,
    is_deleted    boolean      not null,
    created_at    datetime(6)  not null default current_timestamp(6)
);

create table hackathon
(
    id                      bigint auto_increment primary key,
    name                    varchar(255) not null,
    description             text not null,
    password                varchar(255) not null,
    apply_start_date        date         not null,
    apply_end_date          date         not null,
    hackathon_start_date    date         not null,
    hackathon_end_date      date         not null,
    image_url               varchar(255) not null,
    visible_status          boolean      not null,
    is_deleted              boolean      not null,
    created_at              datetime(6)  not null default current_timestamp(6)
);

create table hackathon_team
(
    id              bigint auto_increment primary key,
    hackathon_id    bigint       not null,
    name            varchar(255) not null,
    image_url       varchar(255) not null,
    work            varchar(255) not null,
    github_url      varchar(255) not null,
    prize           varchar(255),
    created_by      bigint       not null,
    is_deleted      boolean      not null,
    created_at      datetime(6)  not null default current_timestamp(6)
);

create table hackathon_team_vote
(
    id              bigint auto_increment primary key,
    hackathon_id    bigint       not null,
    team_id         bigint       not null,
    student_id      bigint       not null,
    is_deleted      boolean      not null,
    created_at datetime(6) not null default current_timestamp(6)
);

create table hackathon_team_member
(
    id              bigint auto_increment primary key,
    hackathon_id    bigint       not null,
    team_id         bigint       not null,
    student_id      bigint       not null,
    role            varchar(255) not null,
    is_leader       boolean      not null,
    is_deleted      boolean      not null,
    created_at      datetime(6)  not null default current_timestamp(6)
);
