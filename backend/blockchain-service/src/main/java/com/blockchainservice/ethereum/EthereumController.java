package com.blockchainservice.ethereum;


import com.blockchainservice.ethereum.service.EthereumService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;

@RestController
@RequiredArgsConstructor
public class EthereumController {

    private final EthereumService ethereumService;

    // 계좌 생성
    @PostMapping("/create-account")
    public ResponseEntity<String> createAccount(@RequestHeader(value = "X-JWT-Claim-identification", required = false) String identification,
                                                @RequestParam String realAccount,
                                                @RequestParam String bookType) {
        try {
            String address = ethereumService.createAccount(identification, realAccount, bookType);
            return ResponseEntity.ok(address.toString());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 이체
    @PostMapping("/transfer")
    public ResponseEntity<String> transfer(@RequestHeader(value = "X-JWT-Claim-identification", required = false) String identification,
                                           @RequestParam String toAddress, @RequestParam BigInteger amount) {
        try {
            String transactionHash = ethereumService.transfer(identification, toAddress, amount);
            return ResponseEntity.ok(transactionHash);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
