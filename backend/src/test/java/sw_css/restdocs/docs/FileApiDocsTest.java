package sw_css.restdocs.docs;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.request.PathParametersSnippet;
import sw_css.file.api.FileController;
import sw_css.restdocs.RestDocsTest;

@WebMvcTest(FileController.class)
public class FileApiDocsTest extends RestDocsTest {

    @Test
    @DisplayName("[성공] 파일을 다운로드할 수 있다.")
    public void downloadFile() throws Exception {
        // given
        final byte[] response = new byte[]{};
        final PathParametersSnippet pathParameters = pathParameters(
                parameterWithName("fileName").description("조회하고자 하는 파일의 이름")
        );

        // when
        when(fileService.downloadFileFromFileSystem(any())).thenReturn(response);

        // then
        final String fileName = "test-file.jpeg";
        mockMvc.perform(RestDocumentationRequestBuilders.get("/files/{fileName}", fileName))
                .andExpect(status().isOk())
                .andDo(document("download-file", pathParameters));
    }
}
