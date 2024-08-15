## member(student)
insert into member (email, name, password, phone_number, is_authorized, is_deleted)
values ('songsy405@naver.com', '송세연', 'password', '010-0000-0000', false, false);

insert into student_member (id, member_id, major_id, minor_id, double_major_id, career, career_detail)
values (202055558, 1, 1, null, null, 'EMPLOYMENT_COMPANY', 'IT 기업 개발자');

insert into member (email, name, password, phone_number, is_authorized, is_deleted)
values ('songsy405@naver.com', '아마란스', 'password', '010-0000-0000', false, false);

insert into student_member (id, member_id, major_id, minor_id, double_major_id, career, career_detail)
values (202055555, 2, 1, null, null, 'GRADUATE_SCHOOL', 'IT 기업 개발자');

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
VALUES (4, 6, 202000000, 'PCC lv3', null, 'APPROVED', null, 1, '2024-06-04', 0, '2024-07-01 18:35:47.566673');
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
VALUES (10, 7, 202000000, 'PCC lv2', null, 'PENDING', null, 1, '2024-06-11', 0, '2024-07-01 18:35:47.580376');

INSERT INTO sw_css.milestone_history (id, milestone_id, student_id, description, file_url, status, reject_reason, count,
                                      activated_at, is_deleted, created_at)
VALUES (11, 15, 202000000, '글로벌 행사 참여', null, 'APPROVED', null, 1, '2024-06-08', 0, '2024-07-01 18:35:47.580376');

INSERT INTO sw_css.milestone_history (id, milestone_id, student_id, description, file_url, status, reject_reason, count,
                                      activated_at, is_deleted, created_at)
VALUES (12, 3, 202000000, '비교과 SW 관련 창업', null, 'APPROVED', null, 2, '2024-06-08', 0, '2024-07-01 18:35:47.580376');
