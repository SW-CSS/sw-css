package sw_css.file.api;

import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sw_css.file.application.FileService;

@RequestMapping("/files")
@RestController
@RequiredArgsConstructor
public class FileController {
    private final FileService fileService;

    @GetMapping
    public ResponseEntity<byte[]> downloadFile(@PathVariable final String fileName) throws IOException {
        byte[] downloadFile = fileService.downloadFileFromFileSystem(fileName);
        return ResponseEntity.ok(downloadFile);
    }
}
