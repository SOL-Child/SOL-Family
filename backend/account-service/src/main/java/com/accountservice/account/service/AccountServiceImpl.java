package com.accountservice.account.service;

import com.accountservice.account.config.RandomWordCombiner;
import com.accountservice.account.dto.request.ConnectReqDto;
import com.accountservice.account.dto.request.TransactionReqDto;
import com.accountservice.account.dto.response.MainResDto;
import com.accountservice.account.dto.response.TransactionDetailDto;
import com.accountservice.account.dto.response.TransactionResDto;
import com.accountservice.account.dto.response.TransferResDto;
import com.accountservice.account.entity.*;
import com.accountservice.account.exception.TransferCodeException;
import com.accountservice.account.repository.JpaAccountRepository;
import com.accountservice.account.repository.JpaOneTransferRepository;
import com.accountservice.account.repository.JpaTransactionRepository;
import com.accountservice.account.repository.JpaTransferRepository;
import com.accountservice.global.error.ErrorCode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDateTime;
import java.util.*;

@Service("accountService")
@Transactional
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService{

    private final RandomWordCombiner randomWordCombiner;
    private final JpaOneTransferRepository jpaOneTransferRepository;
    private final JpaAccountRepository jpaAccountRepository;
    private final JpaTransferRepository jpaTransferRepository;
    private final JpaTransactionRepository jpaTransactionRepository;

    @Override
    public void oneTransfer(String identification, String account) throws IOException, InterruptedException {
        String memo = randomWordCombiner.getCombinedRandomWord();

        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> requestBody = new HashMap<>();

        Map<String, String> dataHeader = new HashMap<>();
        dataHeader.put("apikey", "2023_Shinhan_SSAFY_Hackathon");

        Map<String, Object> dataBody = new HashMap<>();
        dataBody.put("입금은행코드", "088");
        dataBody.put("입금계좌번호", account);
        dataBody.put("입금통장메모", memo);

        requestBody.put("dataHeader", dataHeader);
        requestBody.put("dataBody", dataBody);


        String jsonPayload = objectMapper.writeValueAsString(requestBody);

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://shbhack.shinhan.com/v1/auth/1transfer"))
                .POST(HttpRequest.BodyPublishers.ofString(jsonPayload)) // JSON 데이터를 요청 body로 설정
                .header("Content-Type", "application/json") // Content-Type 헤더 설정
                .build();

        int status = client.send(request, HttpResponse.BodyHandlers.ofString()).statusCode();
        if (status == 200) {
            OneTransfer oneTransfer = OneTransfer.builder()
                    .account(account)
                    .code(memo)
                    .identification(identification)
                    .build();

            jpaOneTransferRepository.save(oneTransfer);
        }
    }

    @Override
    public void connectAccount(String identification, ConnectReqDto connectReqDto, String bookType) {
        Optional<OneTransfer> oneTransfer = jpaOneTransferRepository.findByAccount(connectReqDto.getAccount());
        if (oneTransfer.isPresent()) {
            if(oneTransfer.get().getExp().isBefore(LocalDateTime.now())) throw new TransferCodeException(ErrorCode.TIMEOUT_TRANSFER_CODE);
            if (!oneTransfer.get().getCode().equals(connectReqDto.getMemo()))
                throw new TransferCodeException(ErrorCode.INVALID_TRANSFER_CODE);
            Account account = Account.builder()
                    .account(connectReqDto.getAccount())
                    .identification(identification)
                    .balance("1000000")
                    .bookType(BookType.valueOf(bookType))
                    .build();

            jpaAccountRepository.save(account);
        }
        throw new TransferCodeException(ErrorCode.TRANSFER_CODE_NOT_EXIST);
    }

    @Override
    public TransactionResDto transaction(String identification, TransactionReqDto transactionReqDto) {
        // 입금 계좌
        Optional<Account> deposit = jpaAccountRepository.findByAccount(transactionReqDto.getDepositAccount());
        // 출금 계좌
        Optional<Account> withdraw = jpaAccountRepository.findByAccount(transactionReqDto.getWithdrawalAccount());
        if(deposit.isPresent() && withdraw.isPresent()) {
            String withdrawBal = String.valueOf(Integer.parseInt(withdraw.get().getBalance()) - Integer.parseInt(transactionReqDto.getMoney()));
            String depositBal = String.valueOf(Integer.parseInt(deposit.get().getBalance()) + Integer.parseInt(transactionReqDto.getMoney()));
            Transfer transfer = Transfer.builder()
                    .sender(withdraw.get())
                    .receiver(deposit.get())
                    .identification(identification)
                    .depositMemo(transactionReqDto
                            .getDepositMemo())
                    .withdrawMemo(transactionReqDto.getWithdrawalMemo())
                    .balance(withdrawBal)
                    .type("지출")
                    .build();

            jpaTransferRepository.save(transfer);

            Transfer transferBack = Transfer.builder()
                    .sender(withdraw.get())
                    .receiver(deposit.get())
                    .depositMemo(transactionReqDto
                            .getDepositMemo())
                    .identification(deposit.get().getIdentification())
                    .withdrawMemo(transactionReqDto.getWithdrawalMemo())
                    .balance(depositBal)
                    .type("수입")
                    .build();

            jpaTransferRepository.save(transferBack);

            withdraw.get().setBalance(withdrawBal);
            deposit.get().setBalance(depositBal);

            Transaction transaction = Transaction.builder()
                    .account(withdraw.get().getAccount())
                    .summary("이체")
                    .withdrawalMoney(transactionReqDto.getMoney())
                    .depositMoney("0")
                    .description("모바일")
                    .balance(withdrawBal)
                    .build();

            jpaTransactionRepository.save(transaction);

            Transaction transactionBack = Transaction.builder()
                    .account(deposit.get().getAccount())
                    .summary("입금")
                    .withdrawalMoney("0")
                    .depositMoney(transactionReqDto.getMoney())
                    .description("모바일")
                    .balance(depositBal)
                    .build();

            jpaTransactionRepository.save(transactionBack);

            return new TransactionResDto().of(transfer);
        }
        return null;
    }

    @Override
    public TransferResDto getTransaction(String identification) {
        Optional<Account> account = jpaAccountRepository.findByIdentification(identification);
        if (account.isPresent()) {
            List<TransactionDetailDto> res = new ArrayList<>();
            List<Transaction> transactions = jpaTransactionRepository.findByAccount(account.get().getAccount());
            for (Transaction t : transactions) {
                res.add(new TransactionDetailDto().of(t));
            }
            return new TransferResDto().of(account.get(), res);
        }
        return null;
    }

    @Override
    public MainResDto main(String identification) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://shbhack.shinhan.com/auth/v1/users/"+identification))
                .GET()
                .build();

        HttpResponse<String> userInfo = client.send(request, HttpResponse.BodyHandlers.ofString());

        // Jackson ObjectMapper 생성
        ObjectMapper objectMapper = new ObjectMapper();

        String name = objectMapper.readTree(userInfo.body()).get("name").asText();
        String phone = objectMapper.readTree(userInfo.body()).get("phone").asText();
        String userType = objectMapper.readTree(userInfo.body()).get("userType").asText();
        String familyCode = objectMapper.readTree(userInfo.body()).get("familyCode").asText();
        boolean family = false;
        String familyCnt = objectMapper.readTree(userInfo.body()).get("familyCnt").asText();

        if (familyCode != null) {
            family = true;
        }
        Optional<Account> account = jpaAccountRepository.findByIdentification(identification);
        Account bankbook = null;
        boolean book = true;
        if (account.isPresent()) bankbook = account.get();
        else book = false;

        return new MainResDto().of(name, userType, family, familyCode, familyCnt, book, bankbook);
    }
}
