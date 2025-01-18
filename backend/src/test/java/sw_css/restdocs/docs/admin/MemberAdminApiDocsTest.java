package sw_css.restdocs.docs.admin;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static sw_css.member.domain.CareerType.EMPLOYMENT_COMPANY;
import static sw_css.member.domain.CareerType.GRADUATE_SCHOOL;
import static sw_css.milestone.domain.MilestoneGroup.ACTIVITY;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.PayloadDocumentation;
import org.springframework.restdocs.payload.ResponseFieldsSnippet;
import org.springframework.restdocs.request.QueryParametersSnippet;
import sw_css.admin.member.api.MemberAdminController;
import sw_css.admin.member.application.dto.response.FacultyMemberResponse;
import sw_css.admin.milestone.application.dto.response.MilestoneHistoryResponse;
import sw_css.major.domain.College;
import sw_css.major.domain.Major;
import sw_css.member.application.dto.response.StudentMemberReferenceResponse;
import sw_css.member.application.dto.response.StudentMemberResponse;
import sw_css.member.domain.CareerType;
import sw_css.member.domain.FacultyMember;
import sw_css.member.domain.Member;
import sw_css.member.domain.StudentMember;
import sw_css.milestone.domain.Milestone;
import sw_css.milestone.domain.MilestoneCategory;
import sw_css.milestone.domain.MilestoneStatus;
import sw_css.milestone.persistence.dto.MilestoneHistoryWithStudentInfo;
import sw_css.restdocs.RestDocsTest;

@WebMvcTest(MemberAdminController.class)
public class MemberAdminApiDocsTest extends RestDocsTest {

    @Test
    @DisplayName("[성공] 모든 학생들의 정보를 조회할 수 있다.")
    public void findStudents() throws Exception {
        // given
        final QueryParametersSnippet queryParameters = queryParameters(
                parameterWithName("field").description("검색 필드 번호(option)").optional(),
                parameterWithName("keyword").description("검색할 키워드(option)").optional()
        );

        final ResponseFieldsSnippet responseBodySnippet = responseFields(
                fieldWithPath("totalPages").type(JsonFieldType.NUMBER).description("총 페이지 수"),
                fieldWithPath("totalElements").type(JsonFieldType.NUMBER).description("총 데이터 수"),
                fieldWithPath("size").type(JsonFieldType.NUMBER).description("페이지 내 데이터 수"),
                fieldWithPath("number").type(JsonFieldType.NUMBER).description("페이지 번호"),
                fieldWithPath("sort.empty").type(JsonFieldType.BOOLEAN).description("정렬 속성의 존재 여부"),
                fieldWithPath("sort.sorted").type(JsonFieldType.BOOLEAN).description("정렬 여부"),
                fieldWithPath("sort.unsorted").type(JsonFieldType.BOOLEAN).description("정렬여부"),
                fieldWithPath("first").type(JsonFieldType.BOOLEAN).description("첫 페이지인지 여부"),
                fieldWithPath("last").type(JsonFieldType.BOOLEAN).description("마지막 페이지인지 여부"),
                fieldWithPath("pageable.pageNumber").type(JsonFieldType.NUMBER).description("요청한 페이지번호"),
                fieldWithPath("pageable.pageSize").type(JsonFieldType.NUMBER).description("요청한 페이지크기"),
                fieldWithPath("pageable.sort.empty").type(JsonFieldType.BOOLEAN).description("요청한 데이터가 비었는지 여부"),
                fieldWithPath("pageable.sort.sorted").type(JsonFieldType.BOOLEAN).description("요청한 데이터 정렬 기준 존재 여부"),
                fieldWithPath("pageable.sort.unsorted").type(JsonFieldType.BOOLEAN).description("요청한 데이터 정렬 기준 존재 여부"),
                fieldWithPath("pageable.offset").type(JsonFieldType.NUMBER).description("요청한 페이지오프셋"),
                fieldWithPath("pageable.paged").type(JsonFieldType.BOOLEAN).description("페이징 여부"),
                fieldWithPath("pageable.unpaged").type(JsonFieldType.BOOLEAN).description("페이징 여부"),
                fieldWithPath("numberOfElements").type(JsonFieldType.NUMBER).description("총 데이터 수"),
                fieldWithPath("empty").type(JsonFieldType.BOOLEAN).description("데이터의 존재 여부"),
                fieldWithPath("content[].id").type(JsonFieldType.NUMBER).description("학생의 id(학번)"),
                fieldWithPath("content[].email").type(JsonFieldType.STRING).description("학생의 이메일"),
                fieldWithPath("content[].name").type(JsonFieldType.STRING).description("학생의 이름"),
                fieldWithPath("content[].major").type(JsonFieldType.STRING).description("학생의 주전공"),
                fieldWithPath("content[].minor").type(JsonFieldType.STRING).description("학생의 부전공"),
                fieldWithPath("content[].doubleMajor").type(JsonFieldType.STRING).description("학생의 복수전공"),
                fieldWithPath("content[].phoneNumber").type(JsonFieldType.STRING).description("학생의 전화번호"),
                fieldWithPath("content[].career").type(JsonFieldType.STRING).description("학생의 진로 구분"),
                fieldWithPath("content[].careerDetail").type(JsonFieldType.STRING).description("학생의 진로 상세")
        );

        final Pageable pageable = PageRequest.of(0, 10);
        final Page<StudentMemberResponse> response = new PageImpl<>(List.of(
                new StudentMemberResponse(202055558L, "songsy405@aaa.com", "홍길동",
                        "정보컴퓨터공학부", "", "", "01011111111", GRADUATE_SCHOOL, "대학원 진학"),
                new StudentMemberResponse(202055555L, "abcdefg@aaa.com", "아무개",
                        "사회학과", "", "", "01012345678", EMPLOYMENT_COMPANY, "네카라쿠배")),
                PageRequest.of(0, 10),
                2
        );
        final String token = "Bearer AccessToken";

        // when
        when(memberAdminQueryService.findStudentMembers(any(), any(), any())).thenReturn(response);

        // then
        mockMvc.perform(RestDocumentationRequestBuilders.get("/admin/member/students")
                        .header(HttpHeaders.AUTHORIZATION, token))
                .andExpect(status().isOk())
                .andDo(document("student-find-all", responseBodySnippet));
    }


    @Test
    @DisplayName("[성공] 모든 교직원들의 정보를 조회할 수 있다.")
    public void findFacultyMembers() throws Exception {
        // given
        final QueryParametersSnippet queryParameters = queryParameters(
                parameterWithName("field").description("검색 필드 번호(option)").optional(),
                parameterWithName("keyword").description("검색할 키워드(option)").optional()
        );

        final ResponseFieldsSnippet responseBodySnippet = responseFields(
                fieldWithPath("totalPages").type(JsonFieldType.NUMBER).description("총 페이지 수"),
                fieldWithPath("totalElements").type(JsonFieldType.NUMBER).description("총 데이터 수"),
                fieldWithPath("size").type(JsonFieldType.NUMBER).description("페이지 내 데이터 수"),
                fieldWithPath("number").type(JsonFieldType.NUMBER).description("페이지 번호"),
                fieldWithPath("sort.empty").type(JsonFieldType.BOOLEAN).description("정렬 속성의 존재 여부"),
                fieldWithPath("sort.sorted").type(JsonFieldType.BOOLEAN).description("정렬 여부"),
                fieldWithPath("sort.unsorted").type(JsonFieldType.BOOLEAN).description("정렬여부"),
                fieldWithPath("first").type(JsonFieldType.BOOLEAN).description("첫 페이지인지 여부"),
                fieldWithPath("last").type(JsonFieldType.BOOLEAN).description("마지막 페이지인지 여부"),
                fieldWithPath("pageable.pageNumber").type(JsonFieldType.NUMBER).description("요청한 페이지번호"),
                fieldWithPath("pageable.pageSize").type(JsonFieldType.NUMBER).description("요청한 페이지크기"),
                fieldWithPath("pageable.sort.empty").type(JsonFieldType.BOOLEAN).description("요청한 데이터가 비었는지 여부"),
                fieldWithPath("pageable.sort.sorted").type(JsonFieldType.BOOLEAN).description("요청한 데이터 정렬 기준 존재 여부"),
                fieldWithPath("pageable.sort.unsorted").type(JsonFieldType.BOOLEAN).description("요청한 데이터 정렬 기준 존재 여부"),
                fieldWithPath("pageable.offset").type(JsonFieldType.NUMBER).description("요청한 페이지오프셋"),
                fieldWithPath("pageable.paged").type(JsonFieldType.BOOLEAN).description("페이징 여부"),
                fieldWithPath("pageable.unpaged").type(JsonFieldType.BOOLEAN).description("페이징 여부"),
                fieldWithPath("numberOfElements").type(JsonFieldType.NUMBER).description("총 데이터 수"),
                fieldWithPath("empty").type(JsonFieldType.BOOLEAN).description("데이터의 존재 여부"),
                fieldWithPath("content[].id").type(JsonFieldType.NUMBER).description("교직원의 회원 id"),
                fieldWithPath("content[].facultyId").type(JsonFieldType.NUMBER).description("교직원 번호"),
                fieldWithPath("content[].email").type(JsonFieldType.STRING).description("교직원의 이메일"),
                fieldWithPath("content[].name").type(JsonFieldType.STRING).description("교직원 이름 이름"),
                fieldWithPath("content[].phoneNumber").type(JsonFieldType.STRING).description("교직원 전화번호")
        );

        final Pageable pageable = PageRequest.of(0, 10);
        final Page<FacultyMember> faculties = new PageImpl<>(List.of(
                new FacultyMember(123412L, new Member(1L, "asdf@pusan.ac.kr", "박길태", "", "01000000000", false)),
                new FacultyMember(234523L, new Member(2L, "qwer@pusan.ac.kr", "오해영", "", "01000000000", false)),
                new FacultyMember(345634L, new Member(3L, "zxcv@pusan.ac.kr", "김희수", "", "01000000000", false))
        ));
        final Page<FacultyMemberResponse> response = FacultyMemberResponse.from(faculties, pageable);
        final String token = "Bearer AccessToken";

        //when
        when(memberAdminQueryService.findFacultyMembers(any(), any(), any())).thenReturn(response);

        //then
        mockMvc.perform(
                        RestDocumentationRequestBuilders.get("/admin/member/faculties")
                                .header(HttpHeaders.AUTHORIZATION, token))
                .andExpect(status().isOk())
                .andDo(document("faculty-find-all", queryParameters, responseBodySnippet));

    }
}
