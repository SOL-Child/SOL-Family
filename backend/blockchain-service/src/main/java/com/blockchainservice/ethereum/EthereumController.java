package com.blockchainservice.ethereum;


import com.blockchainservice.ethereum.service.EthereumService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class EthereumController {

    private final EthereumService ethereumService;

    // 계좌 생성
    @PostMapping("/create-account")
    public ResponseEntity<String> createAccount(@RequestHeader(value = "X-JWT-Claim-identification", required = false) String identification,
                                                @RequestParam String realAccount) {
        try {
            String address = ethereumService.createAccount(identification, realAccount);
            return ResponseEntity.ok(address.toString());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
