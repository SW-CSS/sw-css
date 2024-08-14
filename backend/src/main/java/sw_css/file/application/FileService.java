package sw_css.file.application;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Deprecated
@Service
@RequiredArgsConstructor
@Transactional
public class FileService {

    @Value("${data.file-path-prefix}")
    private String filePathPrefix;

    public byte[] downloadFileFromFileSystem(final String fileName) throws IOException {
        final Path filePath = Paths.get(System.getProperty("user.dir") + filePathPrefix)
                .resolve(Paths.get(fileName)).normalize().toAbsolutePath();
        return Files.readAllBytes(filePath);
    }
}
