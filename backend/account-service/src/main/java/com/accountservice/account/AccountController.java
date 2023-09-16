package com.accountservice.account;

import com.accountservice.account.dto.request.ConnectReqDto;
import com.accountservice.account.dto.request.TransferReqDto;
import com.accountservice.account.service.AccountService;
import com.accountservice.global.dto.BaseResponseBody;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1")
@Tag(name = "1. Account API", description = "계좌 api")
public class AccountController {

    private final AccountService accountService;

    @Operation(summary = "계좌 연결 - 1원 이체", description = "/account/v1/1transfer\n\n")
    @PostMapping("/1transfer")
    public ResponseEntity<? extends BaseResponseBody> oneTransfer(@RequestHeader(value = "X-JWT-Claim-identification", required = false) String identification,
                                                                  @RequestBody TransferReqDto transferReqDto) throws IOException, InterruptedException {
        accountService.oneTransfer(identification, transferReqDto.getAccount());
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, "Success"));
    }

    @Operation(summary = "계좌 연결", description = "/account/v1/connect\n\n")
    @PostMapping("/connect")
    public ResponseEntity<? extends BaseResponseBody> connect(@RequestHeader(value = "X-JWT-Claim-identification", required = false) String identification,
                                                                  @RequestBody ConnectReqDto connectReqDto) {
        accountService.connectAccount(identification, connectReqDto);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, "Success"));
    }
}
