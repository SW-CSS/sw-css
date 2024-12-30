package sw_css.restdocs;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.mockmvc.RestDocumentationResultHandler;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;
import sw_css.admin.auth.application.AdminAuthCommandService;
import sw_css.admin.hackathon.application.AdminHackathonCommandService;
import sw_css.admin.hackathon.application.AdminHackathonQueryService;
import sw_css.admin.hackathon.application.AdminHackathonTeamCommandService;
import sw_css.admin.member.application.MemberAdminQueryService;
import sw_css.admin.milestone.application.MilestoneHistoryAdminCommandService;
import sw_css.admin.milestone.application.MilestoneHistoryAdminQueryService;
import sw_css.auth.application.AuthCheckDuplicateService;
import sw_css.auth.application.AuthEmailService;
import sw_css.auth.application.AuthSignInService;
import sw_css.auth.application.AuthSignUpService;
import sw_css.file.application.FileService;
import sw_css.hackathon.application.HackathonQueryService;
import sw_css.helper.ApiTestHelper;
import sw_css.major.application.MajorQueryService;
import sw_css.member.application.MemberQueryService;
import sw_css.member.domain.repository.MemberRepository;
import sw_css.milestone.application.MilestoneHistoryCommandService;
import sw_css.milestone.application.MilestoneHistoryQueryService;
import sw_css.milestone.application.MilestoneQueryService;
import sw_css.utils.JwtToken.AdminArgumentResolver;
import sw_css.utils.JwtToken.MemberArgumentResolver;
import sw_css.utils.JwtToken.StudentArgumentResolver;
import sw_css.utils.JwtToken.SuperAdminArgumentResolver;

@Import(RestDocsConfiguration.class)
@ExtendWith(RestDocumentationExtension.class)
public abstract class RestDocsTest extends ApiTestHelper {

    @MockBean
    protected MajorQueryService majorQueryService;

    @MockBean
    protected MilestoneHistoryCommandService milestoneHistoryCommandService;

    @MockBean
    protected MilestoneHistoryQueryService milestoneHistoryQueryService;

    @MockBean
    protected MilestoneHistoryAdminCommandService milestoneHistoryAdminCommandService;

    @MockBean
    protected MilestoneHistoryAdminQueryService milestoneHistoryAdminQueryService;

    @MockBean
    protected MilestoneQueryService milestoneQueryService;

    @MockBean
    protected MemberQueryService memberQueryService;

    @MockBean
    protected MemberAdminQueryService memberAdminQueryService;

    @MockBean
    protected AdminHackathonQueryService adminHackathonQueryService;

    @MockBean
    protected AdminHackathonCommandService adminHackathonCommandService;

    @MockBean
    protected AdminHackathonTeamCommandService adminHackathonTeamCommandService;

    @MockBean
    protected HackathonQueryService hackathonQueryService;

    @MockBean
    protected FileService fileService;

    @MockBean
    protected AuthSignUpService authSignUpService;

    @MockBean
    protected AuthEmailService authEmailService;

    @MockBean
    protected AuthCheckDuplicateService authCheckDuplicateService;

    @MockBean
    protected AuthSignInService authSignInService;

    @MockBean
    protected AdminAuthCommandService adminAuthCommandService;

    @MockBean
    protected MemberRepository memberRepository;

    @MockBean
    protected MemberArgumentResolver memberArgumentResolver;

    @MockBean
    protected StudentArgumentResolver studentArgumentResolver;

    @MockBean
    protected AdminArgumentResolver adminArgumentResolver;

    @MockBean
    protected SuperAdminArgumentResolver superAdminArgumentResolver;

    @Autowired
    protected RestDocumentationResultHandler restDocs;

    @BeforeEach
    void setUp(
            final WebApplicationContext context,
            final RestDocumentationContextProvider restDocumentation
    ) {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(context)
                .apply(documentationConfiguration(restDocumentation).operationPreprocessors()
                        .withRequestDefaults(prettyPrint())
                        .withResponseDefaults(prettyPrint()))
                .addFilters(new CharacterEncodingFilter("UTF-8", true))
                .build();
    }
}
