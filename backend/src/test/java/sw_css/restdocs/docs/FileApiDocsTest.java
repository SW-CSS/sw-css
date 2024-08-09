package sw_css.restdocs.docs;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import sw_css.file.api.FileController;
import sw_css.restdocs.RestDocsTest;

@WebMvcTest(FileController.class)
public class FileApiDocsTest extends RestDocsTest {

    @Test
    @DisplayName("[성공] 파일을 다운로드할 수 있다.")
    public void downloadFile() throws Exception {
        // given
        final byte[] response = new byte[]{};

        // when
        when(fileService.downloadFileFromFileSystem(anyString())).thenReturn(response);

        // then
        mockMvc.perform(get("/files/dd71ceeb-a721-462f-9ea1-411415f57607_Eg7BBFlUcAAQMzI.jpeg"))
                .andExpect(status().isOk())
                .andDo(document("download-file"));
    }
}
