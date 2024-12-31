## member(student)
insert into member (email, name, password, phone_number, is_deleted)
values ('admin@pusan.ac.kr', '관리자', '$2a$10$YyiOL/E5WjKrZPkB6eQSK.PwZtAO.z3JimFbq/Ky3u3rFf3XTGrWK', '01000000000',
        false);
insert into faculty_member (member_id)
values (1);
insert into member (email, name, password, phone_number, is_deleted)
values ( 'ddang@pusan.ac.kr', '이다은', '$2a$10$YyiOL/E5WjKrZPkB6eQSK.PwZtAO.z3JimFbq/Ky3u3rFf3XTGrWK', '01000000000'
       , false);
insert into student_member (id, member_id, major_id, minor_id, double_major_id, career, career_detail)
values (202055555, 2, 1, null, null, 'GRADUATE_SCHOOL', 'IT 기업 개발자');


## hackathon
insert into hackathon (name, description, password, apply_start_date, apply_end_date, hackathon_start_date, hackathon_end_date, image_url, visible_status, is_deleted)
values('제5회 PNU 창의융합 소프트웨어해커톤', '
# Heading 1
## Heading 2
### Heading 3

This is a **bold** text with some *italic* and [a link](https://example.com).
- ㅁ렁ㄹㄴㄹ
1. ㄹㄴㅇㄹㅁㄹ', '1234', '2024-05-22', '2024-05-29', '2024-05-22', '2024-09-07', '1.png', true, false);
insert into hackathon (name, description, password, apply_start_date, apply_end_date, hackathon_start_date, hackathon_end_date, image_url, visible_status, is_deleted)
values('제4회 PNU 창의융합 소프트웨어해커톤', '
# 제목 1
## 제목 2
### 제목 3
**bold** *italic* [a link](https://example.com).
- asdf
1. qwer', '1234', '2022-03-22', '2022-05-29', '2022-12-22', '2023-03-07', '1.png', true, false);

## hackathon team
insert into hackathon_team (hackathon_id, name, image_url, work, github_url, prize, is_deleted)
values(1, '두레', '1.png', '두레 두레 두레 두레 두레', 'https://github.com/BDD-CLUB/01-doo-re-front',  'GRAND_PRIZE', false);
insert into hackathon_team (hackathon_id, name, image_url, work, github_url, prize, is_deleted)
values(1, '키퍼', '1.png', '키퍼 키퍼 키퍼 키퍼 키퍼', 'https://github.com/KEEPER31337/Homepage-Front-R2',  'EXCELLENCE_PRIZE', false);

## hackathon team vote
insert into hackathon_team_vote (hackathon_id, team_id, student_id, is_deleted)
values(1, 2, 202012341, false);
insert into hackathon_team_vote (hackathon_id, team_id, student_id, is_deleted)
values(1, 2, 202012342, false);

## hackathon team member
insert into hackathon_team_member (hackathon_id, team_id, student_id, role, is_leader, is_deleted)
values(1, 1, 202055574, 'DEVELOPER', true, false);
insert into hackathon_team_member (hackathon_id, team_id, student_id, role, is_leader, is_deleted)
values(1, 2, 202055555, 'DEVELOPER', true, false);


## milestone histories
INSERT INTO sw_css.milestone_history (id, milestone_id, student_id, description, file_url, status, reject_reason, count,
                                      activated_at, is_deleted, created_at)
VALUES (1, 2, 202055558, 'SW 관련 창업 - 교과', null, 'APPROVED', null, 1, '2024-06-01', 0, '2024-07-01 18:35:47.509352');
INSERT INTO sw_css.milestone_history (id, milestone_id, student_id, description, file_url, status, reject_reason, count,
                                      activated_at, is_deleted, created_at)
VALUES (2, 3, 202055558, 'SW 관련 창업 - 비교과', null, 'APPROVED', null, 2, '2024-06-02', 0, '2024-07-01 18:35:47.559920');
INSERT INTO sw_css.milestone_history (id, milestone_id, student_id, description, file_url, status, reject_reason, count,
                                      activated_at, is_deleted, created_at)
VALUES (3, 5, 202055558, 'TOPCIT 수준 2', null, 'APPROVED', null, 1, '2024-06-03', 0, '2024-07-01 18:35:47.563444');
INSERT INTO sw_css.milestone_history (id, milestone_id, student_id, description, file_url, status, reject_reason, count,
                                      activated_at, is_deleted, created_at)
VALUES (4, 6, 202055555, 'PCC lv3', null, 'APPROVED', null, 1, '2024-06-04', 0, '2024-07-01 18:35:47.566673');
INSERT INTO sw_css.milestone_history (id, milestone_id, student_id, description, file_url, status, reject_reason, count,
                                      activated_at, is_deleted, created_at)
VALUES (5, 7, 202055558, 'PCC lv2', null, 'APPROVED', null, 1, '2024-06-05', 0, '2024-07-01 18:35:47.569843');
INSERT INTO sw_css.milestone_history (id, milestone_id, student_id, description, file_url, status, reject_reason, count,
                                      activated_at, is_deleted, created_at)
VALUES (6, 15, 202055558, '글로벌 행사 참여', null, 'APPROVED', null, 1, '2024-06-06', 0, '2024-07-01 18:35:47.571835');
INSERT INTO sw_css.milestone_history (id, milestone_id, student_id, description, file_url, status, reject_reason, count,
                                      activated_at, is_deleted, created_at)
VALUES (7, 16, 202055558, '공인 영어 성적', null, 'APPROVED', null, 1, '2024-06-05', 0, '2024-07-01 18:35:47.574460');
INSERT INTO sw_css.milestone_history (id, milestone_id, student_id, description, file_url, status, reject_reason, count,
                                      activated_at, is_deleted, created_at)
VALUES (8, 2, 202055558, 'SW 관련 창업 - 교과2', null, 'REJECTED', null, 1, '2024-06-04', 0, '2024-07-01 18:35:47.576742');
INSERT INTO sw_css.milestone_history (id, milestone_id, student_id, description, file_url, status, reject_reason, count,
                                      activated_at, is_deleted, created_at)
VALUES (9, 15, 202055558, '글로벌 행사 참여', null, 'PENDING', null, 1, '2024-06-08', 0, '2024-07-01 18:35:47.580376');
INSERT INTO sw_css.milestone_history (id, milestone_id, student_id, description, file_url, status, reject_reason, count,
                                      activated_at, is_deleted, created_at)
VALUES (10, 7, 202055555, 'PCC lv2', null, 'PENDING', null, 1, '2024-06-11', 0, '2024-07-01 18:35:47.580376');

INSERT INTO sw_css.milestone_history (id, milestone_id, student_id, description, file_url, status, reject_reason, count,
                                      activated_at, is_deleted, created_at)
VALUES (11, 15, 202055555, '글로벌 행사 참여', null, 'APPROVED', null, 1, '2024-06-08', 0, '2024-07-01 18:35:47.580376');

INSERT INTO sw_css.milestone_history (id, milestone_id, student_id, description, file_url, status, reject_reason, count,
                                      activated_at, is_deleted, created_at)
VALUES (12, 3, 202055555, '비교과 SW 관련 창업', null, 'APPROVED', null, 2, '2024-06-08', 0, '2024-07-01 18:35:47.580376');
