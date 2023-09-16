package com.blockchainservice.ethereum;


import com.blockchainservice.ethereum.service.EthereumService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.web3j.protocol.core.methods.response.Transaction;

import java.math.BigInteger;
import java.util.List;

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

    // 계좌 잔액 조회
    @GetMapping("/balance/{address}")
    public ResponseEntity<BigInteger> getBalance(@PathVariable String address) {
        try {
            BigInteger balance = ethereumService.getBalance(address);
            return ResponseEntity.ok(balance);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // 월간 거래 내역 조회
    @GetMapping("/month/{address}")
    public ResponseEntity<List<Transaction>> getMonthBalance(@PathVariable String address,
                                                        @RequestParam int year,
                                                        @RequestParam int month) throws Exception {
        return ResponseEntity.ok(ethereumService.getMonthlyTransactions(address, year, month));
    }

    // 월간 지출 내역 조회
    @GetMapping("/expense/{address}")
    public ResponseEntity<List<Transaction>> getExpense(@PathVariable String address,
                                                        @RequestParam int year,
                                                        @RequestParam int month) throws Exception {
        return ResponseEntity.ok(ethereumService.getExpenseTransactions(address, year, month));
    }

    // 월간 수입 내역 조회
    @GetMapping("/income/{address}")
    public ResponseEntity<List<Transaction>> getIncome(@PathVariable String address,
                                                        @RequestParam int year,
                                                        @RequestParam int month) throws Exception {
        return ResponseEntity.ok(ethereumService.getIncomeTransactions(address, year, month));
    }

}
