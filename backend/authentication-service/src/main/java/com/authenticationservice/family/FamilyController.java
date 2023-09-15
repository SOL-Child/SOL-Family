package com.authenticationservice.family;

import com.authenticationservice.family.dto.request.FamilyReqDto;
import com.authenticationservice.family.service.FamilyService;
import com.authenticationservice.global.dto.BaseResponseBody;
import com.authenticationservice.global.util.SecurityUtil;
import com.authenticationservice.user.entity.User;
import com.authenticationservice.user.service.UserService;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1")
@Tag(name = "1. Family API", description = "가족연결 api")
public class FamilyController {

    private final UserService userService;
    private final FamilyService familyService;

    @Operation(summary = "가족연결 QR 생성", description = "/auth/v1/family/qr\n\n" )
    @GetMapping("/family/qr")
    public Object createQR() throws WriterException, IOException {
        String authorizedMember = SecurityUtil.getAuthorizedMember();
        User user = userService.findByPhone(authorizedMember);

        String code =  familyService.createFamily(user);
        int width = 200;
        int height = 200;

        String qrCodeInfo = "{" + "\n" +
                "\"id\" : " + user.getId() + "," + "\n" +
                "\"charger\" : \"" + code + "\"\n" +
                "}";

        BitMatrix matrix = new MultiFormatWriter().encode(qrCodeInfo, BarcodeFormat.QR_CODE, width, height);

        try (ByteArrayOutputStream out = new ByteArrayOutputStream();) {
            MatrixToImageWriter.writeToStream(matrix, "PNG", out);
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(out.toByteArray());
        }
    }

    @Operation(summary = "가족연결", description = "/auth/v1/family\n\n" )
    @PostMapping("/family")
    public ResponseEntity<? extends BaseResponseBody> connectFamily(@RequestBody FamilyReqDto familyReqDto) {
        String authorizedMember = SecurityUtil.getAuthorizedMember();
        User user = userService.findByPhone(authorizedMember);
        familyService.connectFamily(familyReqDto, user);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, "Success"));
    }
}
